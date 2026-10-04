import type { Product } from "./data";

const groups: Record<string, string[]> = {
  "خضار وفاكهة": ["apples", "arugula", "avocado", "bananas", "beetroot", "broccoli", "cabbage", "carrots", "cauliflower", "cucumber", "eggplant", "grapes", "green-beans", "green-cabbage", "green-grapes", "lemons", "mango", "mixed-produce-box", "mixed-vegetables", "onion", "peppers", "potatoes", "produce", "red-cabbage", "red-onion", "romaine-lettuce", "strawberries", "tomatoes", "turnip", "watermelon", "chili-peppers"],
  "ألبان وأجبان": ["butter", "cheddar-wedge", "cheese", "cream-bottle", "egg-carton", "eggs", "milk", "milk-carton", "yogurt", "yogurt-cup"],
  بقالة: ["beans-can", "bread", "coffee", "honey", "jam", "lentils", "nuts", "olive-oil", "pasta", "rice-bag", "sugar", "sunflower-oil", "tomato-sauce"],
  مشروبات: ["apple-juice", "cola", "mango-juice", "orange-juice", "pepsi-can", "water"],
  "لحوم ودواجن": ["beef", "chicken", "tuna", "whole-chicken"],
  مجمدات: ["fish-sticks", "fries", "frozen-corn", "frozen-food", "frozen-ice-cream", "frozen-mixed-vegetables", "frozen-nuggets", "frozen-pizza", "frozen-vegetables", "ice-cream"],
  "عناية بالمنزل": ["cleaner", "detergent", "dish-soap", "tissues"],
  "عناية شخصية": ["diapers", "shampoo", "soap", "toothpaste"],
  "سناكس وحلويات": ["biscuits", "chocolate"],
  "أغذية الحيوانات": ["pet-food"],
  "عطارة وأعشاب": ["herbs"]
};

const words: Record<string, string> = {
  apple: "تفاح", apples: "تفاح", arugula: "جرجير", avocado: "أفوكادو", bananas: "موز", beetroot: "بنجر", broccoli: "بروكلي", cabbage: "كرنب", carrots: "جزر", cauliflower: "قرنبيط", cucumber: "خيار", eggplant: "باذنجان", grapes: "عنب", green: "أخضر", beans: "فاصوليا", lemons: "ليمون", mango: "مانجو", mixed: "مشكل", produce: "منتجات طازجة", vegetables: "خضروات", onion: "بصل", peppers: "فلفل", potatoes: "بطاطس", red: "أحمر", romaine: "خس روماني", strawberries: "فراولة", tomatoes: "طماطم", turnip: "لفت", watermelon: "بطيخ", butter: "زبدة", cheddar: "شيدر", wedge: "قطعة", cheese: "جبن", cream: "قشطة", bottle: "زجاجة", carton: "كرتونة", eggs: "بيض", egg: "بيض", milk: "حليب", yogurt: "زبادي", cup: "كوب", bread: "خبز", coffee: "قهوة", honey: "عسل", jam: "مربى", lentils: "عدس", nuts: "مكسرات", olive: "زيت زيتون", oil: "زيت", pasta: "مكرونة", rice: "أرز", sugar: "سكر", tomato: "طماطم", sauce: "صلصة", cola: "كولا", juice: "عصير", orange: "برتقال", pepsi: "بيبسي", water: "مياه", beef: "لحم بقري", chicken: "دجاج", tuna: "تونة", whole: "كاملة", fish: "سمك", sticks: "أصابع", fries: "بطاطس مقلية", frozen: "مجمد", corn: "ذرة", food: "طعام", ice: "آيس كريم", nuggets: "ناجتس", pizza: "بيتزا", cleaner: "منظف", detergent: "مسحوق تنظيف", dish: "أطباق", tissues: "مناديل", diapers: "حفاضات", shampoo: "شامبو", soap: "صابون", toothpaste: "معجون أسنان", biscuits: "بسكويت", chocolate: "شوكولاتة", pet: "حيوانات", herbs: "أعشاب", chili: "حار"
};

const englishLabel = (slug: string) => slug.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
const arabicLabel = (slug: string) => slug.split("-").map(word => words[word] ?? word).join(" ");

export const iconCatalog: Product[] = Object.entries(groups).flatMap(([category, slugs], groupIndex) => slugs.map((slug, index) => ({
  id: 2000 + groupIndex * 100 + index,
  name: arabicLabel(slug),
  nameEn: englishLabel(slug),
  brand: "ملك ماركت",
  brandEn: "Malek Market",
  category,
  categorySlug: category,
  price: 19 + ((groupIndex * 17 + index * 11) % 130),
  unit: "قطعة",
  unitEn: "piece",
  image: `/product-icons/${slug}-3d.png`,
  color: "#eef8e9",
  rating: Number((4.3 + (index % 6) / 10).toFixed(1))
})));
