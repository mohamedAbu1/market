/**
 * Product artwork is intentionally mapped by product name first.
 * Category-level fallbacks are only used for genuinely unknown products and
 * must never replace a known product with an unrelated ingredient image.
 */
const local = {
  oil: "/products/sunflowerOil.png",
  rice: "/products/rice.svg",
  pasta: "/products/pasta.svg",
  lentils: "/products/lentils.svg",
  beans: "/products/beans.svg",
  tomatoSauce: "/products/tomato-sauce.svg",
  tuna: "/products/tuna.svg",
  honey: "/products/honey.svg",
  jam: "/products/jam.svg",
  coffee: "/products/coffee.svg",
  milk: "/products/milk.svg",
  yogurt: "/products/yogurt.svg",
  cheese: "/products/cheese.svg",
  eggs: "/products/eggs.png",
  strawberries: "/products/strawberries.png",
  bananas: "/products/bananas.png",
  apples: "/products/apples.png",
  tomatoes: "/products/tomatoes.png",
  cucumber: "/products/cucumbers.png",
  potatoes: "/products/potatoes.png",
  chicken: "/products/chicken.png",
  beef: "/products/beef.png",
  orangeJuice: "/products/orange-juice.svg",
  water: "/products/water.svg",
  cola: "/products/cola.svg",
  chocolate: "/products/chocolate.svg",
  biscuits: "/products/biscuits.svg",
  nuts: "/products/nuts.svg",
  frozenVegetables: "/products/frozen-vegetables.svg",
  fries: "/products/fries.svg",
  iceCream: "/products/ice-cream.svg",
  diapers: "/products/diapers.svg",
  wipes: "/products/wipes.svg",
  shampoo: "/products/shampoo.png",
  toothpaste: "/products/toothpaste.svg",
  detergent: "/products/detergent.svg",
  cleaner: "/products/lemon-floor-cleaner.svg",
  tissues: "/products/tissues.svg",
  catFood: "/products/cat-food.svg",
  anise: "/products/anise.svg",
} as const;

const byName: Record<string, string> = {
  "Premium Egyptian Rice": local.rice,
  "Spaghetti Pasta": local.pasta,
  "Yellow Lentils": local.lentils,
  "Plain Fava Beans": local.beans,
  "Sunflower Oil": local.oil,
  "Vegetable Ghee": local.oil,
  "Tomato Sauce": local.tomatoSauce,
  "Light Tuna Chunks": local.tuna,
  "Pure Natural Honey": local.honey,
  "Strawberry Jam": local.jam,
  "White Sugar": "/products/sugar.png",
  "Classic Ground Coffee": local.coffee,
  "Fresh Strawberries": local.strawberries,
  "Local Bananas": local.bananas,
  "Red Apples": local.apples,
  "Local Tomatoes": local.tomatoes,
  "Local Cucumbers": local.cucumber,
  Potatoes: local.potatoes,
  "Full Fat Milk": local.milk,
  "Plain Yogurt": local.yogurt,
  "White Cheese": local.cheese,
  "White Eggs": local.eggs,
  "Fresh Chicken Breast": local.chicken,
  "Chicken Thighs": local.chicken,
  "Minced Beef": local.beef,
  "Natural Orange Juice": local.orangeJuice,
  "Mineral Water": local.water,
  "Cola Soft Drink": local.cola,
  "Milk Chocolate": local.chocolate,
  "Plain Biscuits": local.biscuits,
  "Mixed Nuts": local.nuts,
  "Mixed Frozen Vegetables": local.frozenVegetables,
  "French Fries": local.fries,
  "Vanilla Ice Cream": local.iceCream,
  "Baby Diapers Size 4": local.diapers,
  "Baby Wet Wipes": local.wipes,
  "Dry Hair Shampoo": local.shampoo,
  Toothpaste: local.toothpaste,
  "Automatic Laundry Detergent": local.detergent,
  "Lemon Floor Cleaner": local.cleaner,
  "Facial Tissues": local.tissues,
  "Chicken Cat Food": local.catFood,
  Anise: local.anise,
};

const juiceImages: Record<string, string> = {
  "B Natural Mango Juice": "/products/juices/fd8e6567ffa4620c49294e0a9a6a2ae1.png",
  "Becker's Bester White Grape Juice": "/products/juices/5f93844ef078446321d1a1627b552b84.png",
  "Welch's 100% Grape Juice": "/products/juices/7f9b6c5c9f62bb899f3cb26e71632551.png",
  "Snapple Grape Juice": "/products/juices/54869186d7db2b0318f3a4578e77d4f9.png",
  "Hollinger Apple Juice": "/products/juices/aa6hsehvb.png",
  "Nada Mango Juice": "/products/juices/c1c0566f9155d5e9db1dcb445f368eb4.png",
  "Al Rabie Mango Nectar": "/products/juices/c6e2f477749a5e890eb50617366ddfbf.png",
  "Tutti Frutti Mango Juice": "/products/juices/d9d55cc638cc57fbde66380c769180c7.png",
  "White House Apple Juice": "/products/juices/e1a4a0feea8a68d3e388af15eb0b0cde.png",
  "Maza Mango Juice Drink": "/products/juices/e29aa5b5c2d6dd2db8700b59fefaf8e2.png",
  "Mott's Natural Apple Juice": "/products/juices/f6c8a5a75c7e268f6afb6e67e9d28a21.png",
};

export function productImage(nameEn: string, categorySlug?: string) {
  if (juiceImages[nameEn]) return juiceImages[nameEn];
  if (byName[nameEn]) return byName[nameEn];
  if (categorySlug?.includes("dairy")) return local.milk;
  if (categorySlug?.includes("fruit") || categorySlug?.includes("vegetable")) return local.apples;
  if (categorySlug?.includes("meat") || categorySlug?.includes("poultry")) return local.chicken;
  if (categorySlug?.includes("beverage") || categorySlug?.includes("juice") || categorySlug?.includes("water")) return local.orangeJuice;
  if (categorySlug?.includes("frozen")) return local.frozenVegetables;
  if (categorySlug?.includes("baby")) return local.diapers;
  if (categorySlug?.includes("personal")) return local.shampoo;
  if (categorySlug?.includes("home") || categorySlug?.includes("paper")) return local.cleaner;
  if (categorySlug?.includes("pet")) return local.catFood;
  if (categorySlug?.includes("herb") || categorySlug?.includes("spice")) return local.anise;
  if (categorySlug?.includes("oil") || categorySlug?.includes("grocery")) return local.rice;
  return local.rice;
}
