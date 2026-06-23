import { motion } from "framer-motion";
import { INGREDIENTS } from "../../data/ingredientData";

/**
 * Horizontal, single-row, scrollable strip of ingredients.
 * Each chip is natively draggable (HTML5 drag-and-drop) — drag it down
 * onto <PlateCanvas /> to add it to the meal. Tapping/clicking also adds
 * it, so the tray works on touch devices that don't support HTML5 DnD.
 */
export default function IngredientTray({ onAddIngredient }) {
  const handleDragStart = (e, ingredientId) => {
    e.dataTransfer.setData("text/ahara-ingredient-id", ingredientId);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-lg border-b border-outline-variant/30 p-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-headline-md text-label-md uppercase tracking-widest text-on-surface-variant">
          Ingredient Library
        </h3>
        <span className="text-caption text-on-surface-variant flex items-center gap-1">
          Drag down to the plate
          <span className="material-symbols-outlined text-sm">south</span>
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-2">
        {INGREDIENTS.map((ingredient) => (
          <motion.button
            key={ingredient.id}
            type="button"
            draggable
            onDragStart={(e) => handleDragStart(e, ingredient.id)}
            onClick={() => onAddIngredient(ingredient.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="flex-shrink-0 group cursor-grab active:cursor-grabbing text-center"
          >
            <div className="w-20 h-20 bg-surface-container rounded-2xl overflow-hidden mb-2 ring-2 ring-transparent group-hover:ring-primary transition-all shadow-sm">
              <img
                alt={ingredient.name}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
                src={ingredient.image}
              />
            </div>
            <span className="text-caption font-bold text-on-surface">
              {ingredient.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}