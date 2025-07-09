// Define unit types
type UnitCategory = 'weight' | 'memory' | 'time' | 'distance';
type UnitValues = Record<string, number>;

// SI unit conversion factors
const UNITS: Record<UnitCategory, UnitValues> = {
  weight: { g: 1, kg: 1000, mg: 0.001 },
  memory: { B: 1, KB: 1024, MB: 1048576 },
  time: { sec: 1, min: 60, hour: 3600 },
  distance: { mm: 0.001, cm: 0.01, m: 1, km: 1000 }
};

export const generateQuestion = () => {
  const categories = Object.keys(UNITS) as UnitCategory[];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const units = Object.keys(UNITS[category]);
  
  const [fromUnit, toUnit] = units.sort(() => 0.5 - Math.random()).slice(0, 2);
  
  // Ensure units exist in the category
  if (!fromUnit || !toUnit || 
      !UNITS[category][fromUnit] || 
      !UNITS[category][toUnit]) {
    // Return a default question if units are invalid
    return {
      question: "1 kg = ? g",
      answer: 1000,
      category: 'weight'
    };
  }
  
  const value = Math.floor(Math.random() * 100) + 1;
  const answer = value * (UNITS[category][fromUnit] / UNITS[category][toUnit]);
  
  return {
    question: `${value} ${fromUnit} = ? ${toUnit}`,
    answer: parseFloat(answer.toFixed(4)),
    category
  };
};

export const timeLimits = {
  easy: 20000,
  medium: 15000,
  hard: 10000
};
