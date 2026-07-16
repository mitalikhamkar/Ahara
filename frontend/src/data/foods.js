// Reference nutrition per serving (approximate, per common household unit).
// Values chosen from standard USDA/IFCT references and rounded for UI clarity.
// unit is the label shown next to the food chip.
export const FOODS = [
  { id: 'egg', name: 'Egg', unit: '1 large', img: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=400&q=80',
    n: { cal: 72, protein: 6.3, carbs: 0.4, fat: 5, fiber: 0, sugar: 0.4, sodium: 71, calcium: 28, iron: 0.9, vitc: 0, water: 38 } },
  { id: 'chicken', name: 'Chicken Breast', unit: '100 g', img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
    n: { cal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, calcium: 15, iron: 1, vitc: 0, water: 65 } },
  { id: 'rice', name: 'Rice', unit: '1 cup cooked', img: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80',
    n: { cal: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, sugar: 0.1, sodium: 2, calcium: 16, iron: 1.9, vitc: 0, water: 100 } },
  { id: 'paneer', name: 'Paneer', unit: '50 g', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
    n: { cal: 130, protein: 9, carbs: 3, fat: 10, fiber: 0, sugar: 2, sodium: 8, calcium: 200, iron: 0.1, vitc: 0, water: 25 } },
  { id: 'milk', name: 'Milk', unit: '1 cup', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    n: { cal: 149, protein: 7.7, carbs: 12, fat: 8, fiber: 0, sugar: 12, sodium: 105, calcium: 276, iron: 0, vitc: 0, water: 215 } },
  { id: 'yogurt', name: 'Greek Yogurt', unit: '1 cup', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    n: { cal: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, sugar: 6, sodium: 61, calcium: 187, iron: 0, vitc: 0, water: 200 } },
  { id: 'banana', name: 'Banana', unit: '1 medium', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
    n: { cal: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, sugar: 14, sodium: 1, calcium: 6, iron: 0.3, vitc: 10, water: 89 } },
  { id: 'apple', name: 'Apple', unit: '1 medium', img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=400&q=80',
    n: { cal: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, sugar: 19, sodium: 2, calcium: 11, iron: 0.2, vitc: 8.4, water: 156 } },
  { id: 'broccoli', name: 'Broccoli', unit: '1 cup', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=400&q=80',
    n: { cal: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, sugar: 2.2, sodium: 33, calcium: 62, iron: 1, vitc: 101, water: 78 } },
  { id: 'spinach', name: 'Spinach', unit: '1 cup', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    n: { cal: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, sugar: 0.1, sodium: 24, calcium: 30, iron: 0.8, vitc: 8.4, water: 28 } },
  { id: 'oats', name: 'Oats', unit: '1 cup cooked', img: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80',
    n: { cal: 154, protein: 5.4, carbs: 27, fat: 2.5, fiber: 4, sugar: 1.1, sodium: 9, calcium: 21, iron: 1.7, vitc: 0, water: 200 } },
  { id: 'bread', name: 'Bread', unit: '1 slice', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    n: { cal: 79, protein: 2.7, carbs: 14, fat: 1, fiber: 1.1, sugar: 1.4, sodium: 137, calcium: 30, iron: 0.9, vitc: 0, water: 12 } },
  { id: 'pb', name: 'Peanut Butter', unit: '1 tbsp', img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=400&q=80',
    n: { cal: 94, protein: 3.5, carbs: 3.5, fat: 8, fiber: 1, sugar: 1.5, sodium: 73, calcium: 7, iron: 0.3, vitc: 0, water: 1 } },
  { id: 'almonds', name: 'Almonds', unit: '1 oz (23)', img: 'https://images.pexels.com/photos/971080/pexels-photo-971080.jpeg?auto=compress&cs=tinysrgb&w=400',
    n: { cal: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, sugar: 1.2, sodium: 0, calcium: 76, iron: 1, vitc: 0, water: 1 } },
  { id: 'fish', name: 'Fish', unit: '100 g salmon', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    n: { cal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, sodium: 59, calcium: 12, iron: 0.8, vitc: 0, water: 65 } },
  { id: 'dal', name: 'Dal', unit: '1 cup cooked', img: 'https://images.unsplash.com/photo-1626200925431-0e3d5b1d6b6f?auto=format&fit=crop&w=400&q=80',
    n: { cal: 198, protein: 12, carbs: 33, fat: 1, fiber: 12, sugar: 3, sodium: 400, calcium: 40, iron: 4.5, vitc: 3, water: 175 } },
  { id: 'avocado', name: 'Avocado', unit: '1/2 fruit', img: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=400&q=80',
    n: { cal: 160, protein: 2, carbs: 8.5, fat: 15, fiber: 6.7, sugar: 0.7, sodium: 7, calcium: 12, iron: 0.5, vitc: 10, water: 100 } },
  { id: 'sweetpotato', name: 'Sweet Potato', unit: '1 medium', img: 'https://images.unsplash.com/photo-1596097635121-14b38c5d7a55?auto=format&fit=crop&w=400&q=80',
    n: { cal: 103, protein: 2.3, carbs: 24, fat: 0.2, fiber: 3.8, sugar: 7.4, sodium: 41, calcium: 43, iron: 0.7, vitc: 22, water: 100 } },
  { id: 'tofu', name: 'Tofu', unit: '100 g', img: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?auto=format&fit=crop&w=400&q=80',
    n: { cal: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, sugar: 0.6, sodium: 7, calcium: 350, iron: 5.4, vitc: 0.1, water: 84 } },
  { id: 'cheese', name: 'Cheese', unit: '1 oz cheddar', img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80',
    n: { cal: 113, protein: 7, carbs: 0.4, fat: 9, fiber: 0, sugar: 0.1, sodium: 174, calcium: 202, iron: 0.1, vitc: 0, water: 10 } },
];

export const NUTRIENT_META = [
  { key: 'cal', label: 'Calories', unit: 'kcal', color: '#6FA67A' },
  { key: 'protein', label: 'Protein', unit: 'g', color: '#7EA8D9' },
  { key: 'carbs', label: 'Carbohydrates', unit: 'g', color: '#C8A97E' },
  { key: 'fat', label: 'Fat', unit: 'g', color: '#B084CC' },
  { key: 'fiber', label: 'Fiber', unit: 'g', color: '#6FA67A' },
  { key: 'sugar', label: 'Sugar', unit: 'g', color: '#E38A6C' },
  { key: 'sodium', label: 'Sodium', unit: 'mg', color: '#7EA8D9' },
  { key: 'calcium', label: 'Calcium', unit: 'mg', color: '#C8A97E' },
  { key: 'iron', label: 'Iron', unit: 'mg', color: '#B084CC' },
  { key: 'vitc', label: 'Vitamin C', unit: 'mg', color: '#E38A6C' },
  { key: 'water', label: 'Water', unit: 'ml', color: '#7EA8D9' },
];

// Mifflin-St Jeor + activity factor + goal adjustment
export function computeTargets(profile) {
  const { age = 30, gender = 'male', height_cm = 170, weight_kg = 70, activity_level = 'moderate', goal = 'maintain' } = profile || {};
  let bmr;
  if (gender === 'female') bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;
  else bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;
  const activityFactors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, athlete: 1.9 };
  const tdee = bmr * (activityFactors[activity_level] || 1.55);
  const goalAdj = { lose: -400, maintain: 0, gain: 350, muscle: 250, health: 0 };
  const cal = Math.round(tdee + (goalAdj[goal] ?? 0));
  const protein = Math.round((goal === 'muscle' ? 1.8 : goal === 'lose' ? 1.6 : 1.2) * weight_kg);
  const fat = Math.round((cal * 0.28) / 9);
  const carbs = Math.max(120, Math.round((cal - protein * 4 - fat * 9) / 4));
  return {
    cal, protein, carbs, fat,
    fiber: 30, sugar: 45, sodium: 2300, calcium: 1000, iron: 15, vitc: 90, water: 2500,
  };
}
