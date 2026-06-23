import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MEAL_TARGETS, calculateMealScore } from "../../data/ingredientData";

const MACRO_ROWS = [
  { key: "protein", label: "Protein", dotClass: "bg-primary-container" },
  { key: "carbs", label: "Carbs", dotClass: "bg-tertiary-container" },
  { key: "fat", label: "Fat", dotClass: "bg-secondary-container" },
  { key: "fiber", label: "Fiber", dotClass: "bg-secondary" },
];

const SCORE_CIRCUMFERENCE = 402; // 2 * PI * r(64), matches the original Stitch ring

function scoreLabel(score) {
  if (score >= 85) return "Excellent Balance";
  if (score >= 65) return "Good Balance";
  if (score >= 40) return "Needs Adjustment";
  return "Far From Target";
}

/**
 * Left-hand "Meal Analytics" rail.
 * Holds: the plate photo capture/accept flow, the meal score ring,
 * the live macro progress bars, and the meal-type + save controls.
 */
export default function NutritionPanel({
  totals,
  mealType,
  onMealTypeChange,
  onSave,
  onPhotoAccepted,
}) {
  const fileInputRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoAccepted, setPhotoAccepted] = useState(false);

  const targets = MEAL_TARGETS[mealType];
  const score = calculateMealScore(totals, targets);
  const dashOffset = SCORE_CIRCUMFERENCE * (1 - score / 100);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
    setPhotoAccepted(false);
  };

  const handleAcceptPhoto = () => {
    setPhotoAccepted(true);
    onPhotoAccepted?.(photoUrl);
  };

  const handleRetake = () => {
    setPhotoUrl(null);
    setPhotoAccepted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-surface-container-high p-8 flex flex-col border-r border-outline-variant/20 h-screen overflow-y-auto">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
        Meal Analytics
      </h2>

      {/* Plate Photo Capture + Accept */}
      <div className="bg-white rounded-[24px] p-5 mb-8 shadow-md border border-primary/10">
        <p className="font-label-md text-label-md text-on-surface-variant mb-3">
          Plate Photo
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {!photoUrl && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">photo_camera</span>
            <span className="text-caption font-bold">Capture or Upload Plate</span>
          </button>
        )}

        {photoUrl && (
          <div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3">
              <img
                src={photoUrl}
                alt="Captured plate"
                className="w-full h-full object-cover"
              />
              {photoAccepted && (
                <div className="absolute inset-0 bg-on-surface/10 flex items-center justify-center">
                  <span className="bg-secondary text-white text-caption font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    Accepted
                  </span>
                </div>
              )}
            </div>

            {!photoAccepted ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-highest text-on-surface text-caption font-bold hover:bg-surface-container transition-colors"
                >
                  Retake
                </button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAcceptPhoto}
                  className="px-4 py-2.5 rounded-xl bg-primary text-white text-caption font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Accept Photo
                </motion.button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleRetake}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-highest text-on-surface-variant text-caption font-bold hover:bg-surface-container transition-colors"
              >
                Retake Photo
              </button>
            )}
          </div>
        )}
      </div>

      {/* Meal Score Gauge Card */}
      <div className="bg-white rounded-[32px] p-6 mb-8 text-center shadow-lg border border-primary/10">
        <p className="font-label-md text-label-md text-on-surface-variant mb-4">
          Meal Score
        </p>
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              className="text-surface-container"
              cx="72"
              cy="72"
              fill="transparent"
              r="64"
              stroke="currentColor"
              strokeWidth="10"
            />
            <circle
              className="text-primary progress-ring-circle"
              cx="72"
              cy="72"
              fill="transparent"
              r="64"
              stroke="currentColor"
              strokeDasharray={SCORE_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display-lg text-4xl text-primary font-extrabold leading-none">
              {score}
            </span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
              / 100
            </span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-secondary font-bold flex items-center justify-center gap-1">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          {scoreLabel(score)}
        </p>
      </div>

      {/* Live Nutrition Vertical Panel */}
      <div className="space-y-6 flex-1">
        {MACRO_ROWS.map(({ key, label, dotClass }) => {
          const consumed = totals[key];
          const target = targets[key];
          const pctRaw = target > 0 ? (consumed / target) * 100 : 0;
          const pct = Math.min(100, Math.max(0, pctRaw));
          const remaining = target - consumed;
          const remainingLabel =
            remaining >= 0
              ? `Remaining: ${remaining.toFixed(1)}g`
              : `${Math.abs(remaining).toFixed(1)}g over`;

          return (
            <div
              key={key}
              className="bg-white/50 rounded-2xl p-4 border border-outline-variant/20"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${dotClass}`} />
                  <span className="font-label-md text-on-surface">{label}</span>
                </div>
                <span className="text-caption font-bold text-on-surface">
                  {consumed.toFixed(1)}g / {target}g
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden mb-2">
                <motion.div
                  className={`h-full rounded-full ${dotClass}`}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant uppercase tracking-tighter">
                <span>Consumed: {consumed.toFixed(1)}g</span>
                <span>{remainingLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Type & Save */}
      <div className="mt-8 pt-8 border-t border-outline-variant/30">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {Object.keys(MEAL_TARGETS).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onMealTypeChange(type)}
              className={`px-3 py-3 rounded-xl text-caption font-bold transition-colors ${
                mealType === type
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container-highest text-on-surface hover:bg-primary-fixed"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onSave}
          className="w-full bg-primary text-white font-headline-md py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            save
          </span>
          Save Daily Log
        </motion.button>
      </div>
    </aside>
  );
}