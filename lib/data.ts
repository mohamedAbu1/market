import { imageProducts } from "@/lib/image-products";
export type Product = { id: number; name: string; nameEn?: string; brand: string; brandEn?: string; category: string; categorySlug?: string; price: number; oldPrice?: number; unit: string; unitEn?: string; image: string; color: string; rating: number; badge?: string; badgeEn?: string };
export const categories = [
  { name: "خضار وفاكهة", nameEn: "Fruits & Vegetables", icon: "🍎", tone: "bg-red-50" }, { name: "ألبان وأجبان", nameEn: "Dairy & Eggs", icon: "🥛", tone: "bg-blue-50" },
  { name: "بقالة", nameEn: "Grocery", icon: "🛒", tone: "bg-amber-50" }, { name: "مشروبات", nameEn: "Beverages", icon: "🧃", tone: "bg-cyan-50" },
  { name: "لحوم ودواجن", nameEn: "Meat & Poultry", icon: "🍗", tone: "bg-rose-50" }, { name: "مجمدات", nameEn: "Frozen Food", icon: "🧊", tone: "bg-indigo-50" },
  { name: "سناكس وحلويات", nameEn: "Snacks & Sweets", icon: "🍫", tone: "bg-orange-50" }, { name: "عناية بالمنزل", nameEn: "Home Care", icon: "🧽", tone: "bg-lime-50" },
  { name: "عناية شخصية", nameEn: "Personal Care", icon: "🧴", tone: "bg-purple-50" }, { name: "منتجات الأطفال", nameEn: "Baby Care", icon: "🍼", tone: "bg-pink-50" },
  { name: "أغذية الحيوانات", nameEn: "Pet Supplies", icon: "🐾", tone: "bg-yellow-50" }, { name: "عطارة وأعشاب", nameEn: "Herbs & Spices", icon: "🌿", tone: "bg-emerald-50" }
];
const baseProducts: Product[] = [
  { id: 1, name: "زيت دوار الشمس النقي", nameEn: "Pure Sunflower Oil", brand: "حلوة", brandEn: "Halwa", category: "بقالة", categorySlug: "grocery", price: 89.95, oldPrice: 105, unit: "1.5 لتر", unitEn: "1.5 L", image: "/products/sunflowerOil.png", color: "#fff1c7", rating: 4.8, badge: "خصم 14%", badgeEn: "14% off" },
  { id: 2, name: "أرز مصري فاخر", nameEn: "Premium Egyptian Rice", brand: "الضحى", brandEn: "Al Doha", category: "بقالة", categorySlug: "grocery", price: 58.5, oldPrice: 65, unit: "1 كجم", unitEn: "1 kg", image: "/products/rice.svg", color: "#f6f0df", rating: 4.7, badge: "الأكثر مبيعاً", badgeEn: "Best seller" },
  { id: 3, name: "لبن كامل الدسم", nameEn: "Full-fat Milk", brand: "جهينة", brandEn: "Juhayna", category: "ألبان وأجبان", categorySlug: "dairy-eggs", price: 43.95, unit: "1 لتر", unitEn: "1 L", image: "/products/milk.svg", color: "#e9f6ff", rating: 4.9 },
  { id: 4, name: "فراولة طازجة", nameEn: "Fresh Strawberries", brand: "ملك ماركت فريش", brandEn: "Malek Market Fresh", category: "خضار وفاكهة", categorySlug: "fruits-vegetables", price: 49.99, oldPrice: 59.99, unit: "500 جم", unitEn: "500 g", image: "/products/strawberries.png", color: "#ffe7ea", rating: 4.6, badge: "طازج اليوم", badgeEn: "Fresh today" },
  { id: 5, name: "صدور دجاج متبلة", nameEn: "Marinated Chicken Breast", brand: "ملك ماركت فريش", brandEn: "Malek Market Fresh", category: "لحوم ودواجن", categorySlug: "meat-poultry", price: 179.9, unit: "1 كجم", unitEn: "1 kg", image: "/products/chicken.png", color: "#fff0ea", rating: 4.5 },
  { id: 6, name: "عصير برتقال طبيعي", nameEn: "Natural Orange Juice", brand: "بيتي", brandEn: "Beyti", category: "مشروبات", categorySlug: "beverages", price: 32.5, oldPrice: 39, unit: "1 لتر", unitEn: "1 L", image: "/products/orange-juice.svg", color: "#fff0d9", rating: 4.4, badge: "عرض خاص", badgeEn: "Special offer" },
  { id: 7, name: "شوكولاتة بالحليب", nameEn: "Milk Chocolate", brand: "جالكسي", brandEn: "Galaxy", category: "سناكس وحلويات", categorySlug: "snacks-sweets", price: 42, unit: "90 جم", unitEn: "90 g", image: "/products/chocolate.svg", color: "#f5e7dc", rating: 4.8 },
  { id: 8, name: "منظف أرضيات برائحة الليمون", nameEn: "Lemon Floor Cleaner", brand: "بريل", brandEn: "Pril", category: "عناية بالمنزل", categorySlug: "home-care", price: 74.95, oldPrice: 86, unit: "1 لتر", unitEn: "1 L", image: "/products/lemon-floor-cleaner.svg", color: "#e6f8d9", rating: 4.6, badge: "خصم 13%", badgeEn: "13% off" }
];

export const products: Product[] = [...baseProducts, ...imageProducts];


