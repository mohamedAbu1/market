export type CategoryDefinition = {
  slug: string;
  name: string;
  nameEn: string;
  eyebrow: string;
  description: string;
  descriptionEn: string;
  image: string;
  accent: string;
  soft: string;
  icon: string;
  productSlugs: string[];
};

export const categoryDefinitions: CategoryDefinition[] = [
  { slug: "fruits-vegetables", name: "خضار وفاكهة", nameEn: "Fruits & Vegetables", eyebrow: "طازة كل يوم", description: "اختيارات طازجة تصل إليك بعناية من السوق لباب بيتك.", descriptionEn: "Fresh picks selected with care and delivered from the market to your door.", image: "/product-icons/strawberries-3d.png", accent: "#e45b43", soft: "#fff0e9", icon: "/product-icons/produce-3d.png", productSlugs: ["fruits-vegetables"] },
  { slug: "dairy-eggs", name: "ألبان وأجبان", nameEn: "Dairy & Eggs", eyebrow: "أساسيات الفطور", description: "ألبان وأجبان وبيض يومي بجودة تثق فيها.", descriptionEn: "Everyday dairy, cheese and eggs you can trust.", image: "/product-icons/milk-carton-3d.png", accent: "#2b8bb5", soft: "#eaf7ff", icon: "/product-icons/milk-3d.png", productSlugs: ["dairy-eggs"] },
  { slug: "grocery", name: "بقالة ومواد غذائية", nameEn: "Grocery & Pantry", eyebrow: "مؤونة البيت", description: "كل أساسيات المطبخ في مكان واحد، مرتبة لتجدها بسرعة.", descriptionEn: "Pantry staples organized so you can find them quickly.", image: "/product-icons/rice-bag-3d.png", accent: "#b7791f", soft: "#fff8df", icon: "/product-icons/rice-bag-3d.png", productSlugs: ["grocery", "rice-pasta-grains", "oils-ghee", "canned-food", "sugar-honey-jam", "coffee-tea", "sauces-spices"] },
  { slug: "beverages", name: "مشروبات", nameEn: "Beverages", eyebrow: "رشفة منعشة", description: "مشروبات باردة وعصائر ومياه لكل وقت.", descriptionEn: "Juices, water and refreshing drinks for every moment.", image: "/product-icons/orange-juice-3d.png", accent: "#1596a5", soft: "#e6fbfa", icon: "/product-icons/orange-juice-3d.png", productSlugs: ["beverages", "juices", "water-soft-drinks"] },
  { slug: "meat-poultry", name: "لحوم ودواجن", nameEn: "Meat & Poultry", eyebrow: "اختيار طازج", description: "قطع مختارة بعناية لوجبات البيت اليومية.", descriptionEn: "Carefully selected cuts for everyday home cooking.", image: "/product-icons/chicken-3d.png", accent: "#b94b4b", soft: "#fff0ee", icon: "/product-icons/chicken-3d.png", productSlugs: ["meat-poultry"] },
  { slug: "frozen-food", name: "مجمدات", nameEn: "Frozen Food", eyebrow: "جاهز وقت ما تحتاج", description: "حلول عملية وسريعة للفريزر والمطبخ.", descriptionEn: "Practical and quick freezer essentials for your kitchen.", image: "/product-icons/frozen-food-3d.png", accent: "#5667a6", soft: "#eef1ff", icon: "/product-icons/frozen-food-3d.png", productSlugs: ["frozen-food"] },
  { slug: "snacks-sweets", name: "سناكس وحلويات", nameEn: "Snacks & Sweets", eyebrow: "وقت حلو", description: "شوكولاتة وبسكويت ومكسرات للّحظات الصغيرة.", descriptionEn: "Chocolate, biscuits and nuts for the little moments.", image: "/product-icons/chocolate-3d.png", accent: "#c55b89", soft: "#fff0f6", icon: "/product-icons/chocolate-3d.png", productSlugs: ["snacks-sweets", "biscuits-chocolate"] },
  { slug: "home-care", name: "عناية بالمنزل", nameEn: "Home Care", eyebrow: "بيت مرتب", description: "منظفات ومستلزمات ورقية لبيت أسهل وأهدى.", descriptionEn: "Cleaning and paper essentials for a calmer home.", image: "/product-icons/cleaner-3d.png", accent: "#72a92c", soft: "#f2fbe8", icon: "/product-icons/cleaner-3d.png", productSlugs: ["home-care", "paper-products"] },
  { slug: "personal-care", name: "عناية شخصية", nameEn: "Personal Care", eyebrow: "روتينك اليومي", description: "منتجات العناية الشخصية التي تحتاجها كل يوم.", descriptionEn: "Personal care essentials for your everyday routine.", image: "/product-icons/shampoo-3d.png", accent: "#984f8f", soft: "#fbf0fb", icon: "/product-icons/shampoo-3d.png", productSlugs: ["personal-care"] },
  { slug: "baby-care", name: "منتجات الأطفال", nameEn: "Baby Care", eyebrow: "لصغيرك", description: "احتياجات الأطفال المختارة بعناية وراحة.", descriptionEn: "Thoughtfully selected essentials for your little one.", image: "/product-icons/diapers-3d.png", accent: "#d989a9", soft: "#fff3f7", icon: "/product-icons/diapers-3d.png", productSlugs: ["baby-care"] },
  { slug: "pet-supplies", name: "مستلزمات الحيوانات", nameEn: "Pet Supplies", eyebrow: "لأصحاب البيت", description: "غذاء ومستلزمات يومية لأصدقائك الصغار.", descriptionEn: "Everyday food and essentials for your furry friends.", image: "/product-icons/pet-food-3d.png", accent: "#9b6b45", soft: "#fff5e9", icon: "/product-icons/pet-food-3d.png", productSlugs: ["pet-supplies"] },
  { slug: "herbs", name: "عطارة وأعشاب", nameEn: "Herbs & Spices", eyebrow: "نكهة البيت", description: "أعشاب وتوابل تضيف لمستك الخاصة لكل وصفة.", descriptionEn: "Herbs and spices to add your signature to every recipe.", image: "/product-icons/herbs-3d.png", accent: "#4e8b59", soft: "#edf9ee", icon: "/product-icons/herbs-3d.png", productSlugs: ["herbs"] }
];

export const getCategoryDefinition = (slug: string) => categoryDefinitions.find(category => category.slug === slug);
