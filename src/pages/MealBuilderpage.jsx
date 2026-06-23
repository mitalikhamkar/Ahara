import { useState } from "react";
import IngredientTray from "../components/mealbuilder/IngredientTray";
import PlateCanvas from "../components/mealbuilder/PlateCanvas";
import NutritionPanel from "../components/mealbuilder/NutritionPanel";
import { findIngredient, calculateTotals } from "../data/ingredientData";

// Starting state mirrors the original Stitch mock: 2 eggs + 100g paneer
// already sitting on the plate.
const INITIAL_PLATED_ITEMS = [
  { id: "egg", amount: 2 },
  { id: "paneer", amount: 100 },
];

export default function MealBuilderpage() {
  const [platedItems, setPlatedItems] = useState(INITIAL_PLATED_ITEMS);
  const [mealType, setMealType] = useState("Lunch");

  const totals = calculateTotals(platedItems);

  const handleAddIngredient = (ingredientId) => {
    const ingredient = findIngredient(ingredientId);
    if (!ingredient) return;

    setPlatedItems((prev) => {
      const existing = prev.find((item) => item.id === ingredientId);
      if (existing) {
        return prev.map((item) =>
          item.id === ingredientId
            ? { ...item, amount: item.amount + ingredient.defaultAmount }
            : item
        );
      }
      return [...prev, { id: ingredientId, amount: ingredient.defaultAmount }];
    });
  };

  const handleUpdateAmount = (ingredientId, delta) => {
    setPlatedItems((prev) =>
      prev
        .map((item) =>
          item.id === ingredientId ? { ...item, amount: item.amount + delta } : item
        )
        .filter((item) => item.amount > 0)
    );
  };

  const handleSave = () => {
    // TODO: replace with the real API call to log this meal once the
    // backend endpoint is ready — payload already has everything it needs.
    console.log("Saving daily log:", { mealType, platedItems, totals });
  };

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-md py-sm">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-lg text-primary tracking-tight">
            Ahara
          </span>
          <div className="hidden md:flex gap-6 ml-8">
            <a
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-primary font-bold border-b-2 border-primary transition-colors duration-200"
              href="#"
            >
              Meal Builder
            </a>
            <a
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              href="#"
            >
              History
            </a>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-label-md hover:bg-primary/20 transition-all">
            <span className="material-symbols-outlined">photo_camera</span>
            <span className="hidden sm:inline">Scan Nutrition Label</span>
          </button>
          <div className="relative group">
            <span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-variant/50 rounded-full cursor-pointer transition-all">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </div>
          <span className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-variant/50 rounded-full cursor-pointer transition-all">
            account_circle
          </span>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-md py-md z-40 pt-24">
        <div className="px-6 mb-8">
          <h2 className="font-headline-md text-headline-md text-primary">Ahara Visuals</h2>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Nourish your day
          </p>
        </div>
        <nav className="flex flex-col gap-1">
          <a
            className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </a>
          <a
            className="bg-primary-container text-on-primary-container rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span className="font-label-md text-label-md">Meal Builder</span>
          </a>
          <a
            className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">timeline</span>
            <span className="font-label-md text-label-md">Daily Timeline</span>
          </a>
          <a
            className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-label-md">Profile</span>
          </a>
        </nav>
        <div className="mt-8 px-4 border-t border-outline-variant/30 pt-6">
          <p className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-4 px-2">
            Weekly Progress
          </p>
          <div className="space-y-4 px-2">
            <div>
              <div className="flex justify-between text-caption mb-1">
                <span>Avg Protein</span>
                <span className="font-bold">65g</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[75%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-caption mb-1">
                <span>Goal Completion</span>
                <span className="font-bold">88%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[88%]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-secondary text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-caption">
                Consistency Score: <span className="font-bold text-on-surface">92</span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-auto px-4">
          <button className="w-full bg-primary text-white font-label-md py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">add</span>
            Log Meal
          </button>
        </div>
      </aside>

      {/* Main Hero Canvas */}
      <main className="lg:ml-64 pt-20 h-screen relative overflow-hidden flex flex-col md:flex-row">
        {/* Left: Meal Analytics + Accept Photo */}
        <NutritionPanel
          totals={totals}
          mealType={mealType}
          onMealTypeChange={setMealType}
          onSave={handleSave}
        />

        {/* Right: Plate Builder Section */}
        <section className="flex-1 flex flex-col relative bg-surface-container-lowest/30 overflow-hidden">
          <IngredientTray onAddIngredient={handleAddIngredient} />
          <PlateCanvas
            platedItems={platedItems}
            onUpdateQty={handleUpdateAmount}
            onAddIngredient={handleAddIngredient}
          />
        </section>
      </main>
    </div>
  );
}