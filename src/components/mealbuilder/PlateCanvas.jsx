import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { findIngredient, formatAmount } from "../../data/ingredientData";

const PLATE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDU8FbxiBkWacdfZXe55DO2JbkKfF7WfXVrCBCaLMaSQ6Jcs0txO8G6HSzG-FESTI49sLMSHFdhzbSs6zX922Mj-ItGdeOhkZO_xEMi7IxNlNsK_A-5mfa7IxqGQc3l2ivJ-vKIVvHDaGyuNvgscpCUKBhk3NHhhAtTRx0cA2Ejwz27FKIsKh3S3s2mDqPe7uC9MGLo3qb58FV88F7lLHTbPhUtSwZF9EKCXbzSDP2HHgdUgQjqIteePOFXdpnktaArd0YelYYpDBU";

// Lay dropped ingredients out in a ring around the plate centre so they
// never need manual x/y coordinates and always stay readable on resize.
function ringPosition(index, total) {
  if (total <= 1) return { top: "50%", left: "50%" };
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = total <= 2 ? 22 : 30;
  return {
    top: `${50 + radius * Math.sin(angle)}%`,
    left: `${50 + radius * Math.cos(angle)}%`,
  };
}

export default function PlateCanvas({ platedItems, onUpdateQty, onAddIngredient }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const ingredientId = e.dataTransfer.getData("text/ahara-ingredient-id");
    if (ingredientId) onAddIngredient(ingredientId);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-md plate-container overflow-visible relative">
      {/* Smart Suggestion Tooltip */}
      <div className="float-anim absolute top-10 left-10 z-30 hidden xl:block">
        <div className="glass-card px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 border-primary/20">
          <div className="w-10 h-10 bg-primary-container/20 rounded-full flex items-center justify-center text-primary">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-primary font-bold">
              Smart Suggester
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Low Protein → Add Eggs
            </p>
          </div>
        </div>
      </div>

      {/* The Hero Plate / drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`relative w-[85%] max-w-[650px] aspect-square flex items-center justify-center rounded-full transition-all ${
          isDragOver ? "ring-4 ring-primary ring-offset-4 ring-offset-background" : ""
        }`}
      >
        <img
          alt="Premium Dinner Plate"
          className="w-full h-full object-contain plate-3d rounded-full pointer-events-none"
          src={PLATE_IMAGE}
        />

        {/* Empty-state hint */}
        {platedItems.length === 0 && (
          <p className="absolute font-label-md text-label-md text-on-surface-variant/60 z-10 text-center px-12">
            Drag ingredients here to build your plate
          </p>
        )}

        {/* Ingredients ON Plate */}
        <div className="absolute inset-0 z-10">
          <AnimatePresence>
            {platedItems.map((item, index) => {
              const ing = findIngredient(item.id);
              if (!ing) return null;
              const pos = ringPosition(index, platedItems.length);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-grab active:cursor-grabbing"
                >
                  <div className="ingredient-chip bg-white/90 backdrop-blur-md rounded-2xl p-2 flex items-center gap-3 border border-white shadow-xl transition-all group-hover:scale-105">
                    <img
                      alt={ing.name}
                      className="w-12 h-12 rounded-xl border-2 border-white object-cover"
                      src={ing.image}
                    />
                    <div>
                      <p className="text-xs font-bold text-on-surface whitespace-nowrap">
                        {ing.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -ing.step)}
                          className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-fixed transition-colors text-[10px]"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold whitespace-nowrap">
                          {formatAmount(ing, item.amount)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, ing.step)}
                          className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors text-[10px]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}