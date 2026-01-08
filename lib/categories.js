// lib/categories.js

export const CATEGORY_DEFINITIONS = [
  { id: "Back Pack", en: "Back Pack", cn: "双肩包" },
  { id: "Tool Bag", en: "Tool Bag", cn: "工具包" },
  { id: "Makeup Bag", en: "Makeup Bag", cn: "化妆包" },
  { id: "Tote Bag", en: "Tote Bag", cn: "托特包" },
  { id: "Insulated bag", en: "Insulated bag", cn: "保温包" },
  { id: "Waterproof Bag", en: "Waterproof Bag", cn: "防水包" },
  { id: "Game Case", en: "Game Case", cn: "游戏收纳包" },
  { id: "Laptop Bag", en: "Laptop Bag", cn: "电脑包" },
  { id: "Tablet cases", en: "Tablet cases", cn: "平板电脑包" },
  { id: "Headphone Bag", en: "Headphone Bag", cn: "耳机包" },
];

// Helper to get just the English IDs (for validation)
export const ALLOWED_CATEGORIES = CATEGORY_DEFINITIONS.map((c) => c.id);

// Helper for normalizing input
export const normalizeCategory = (s) => (s || "").toString().trim().toLowerCase();

// Map for quick lookup
export const CATEGORY_MAP = new Map(
  CATEGORY_DEFINITIONS.map((c) => [normalizeCategory(c.id), c.id])
);