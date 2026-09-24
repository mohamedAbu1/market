import { PrismaClient } from "@prisma/client";
import { productImage } from "../lib/product-images.ts";
import { imageProducts } from "../lib/image-products.ts";

const prisma = new PrismaClient();

const categories = [
  ["الأطعمة الطازجة", "Fresh Food", "fresh-food"], ["الخضار والفاكهة", "Fruits & Vegetables", "fruits-vegetables", "fresh-food"],
  ["اللحوم والدواجن", "Meat & Poultry", "meat-poultry", "fresh-food"], ["الألبان والأجبان والبيض", "Dairy, Cheese & Eggs", "dairy-eggs", "fresh-food"],
  ["المخبوزات", "Bakery", "bakery", "fresh-food"], ["البقالة والمواد الغذائية", "Grocery & Pantry", "grocery", ""],
  ["الزيوت والسمن", "Oils & Ghee", "oils-ghee", "grocery"], ["الأرز والمكرونة والحبوب", "Rice, Pasta & Grains", "rice-pasta-grains", "grocery"],
  ["المعلبات", "Canned Food", "canned-food", "grocery"], ["الصلصات والتوابل", "Sauces & Spices", "sauces-spices", "grocery"],
  ["السكر والعسل والمربى", "Sugar, Honey & Jam", "sugar-honey-jam", "grocery"], ["القهوة والشاي", "Coffee & Tea", "coffee-tea", "grocery"],
  ["المشروبات", "Beverages", "beverages", ""], ["العصائر", "Juices", "juices", "beverages"], ["المياه والمشروبات الغازية", "Water & Soft Drinks", "water-soft-drinks", "beverages"],
  ["السناكس والحلويات", "Snacks & Sweets", "snacks-sweets", ""], ["البسكويت والشوكولاتة", "Biscuits & Chocolate", "biscuits-chocolate", "snacks-sweets"],
  ["الأطعمة المجمدة", "Frozen Food", "frozen-food", ""], ["منتجات الأطفال", "Baby Care", "baby-care", ""], ["العناية الشخصية", "Personal Care", "personal-care", ""],
  ["العناية بالمنزل", "Home Care", "home-care", ""], ["المناديل والمنتجات الورقية", "Paper Products", "paper-products", "home-care"],
  ["مستلزمات الحيوانات الأليفة", "Pet Supplies", "pet-supplies", ""], ["العطارة والأعشاب", "Herbs & Spices", "herbs", ""],
  ["المستلزمات الموسمية", "Seasonal", "seasonal", ""]
] as const;

const products = [
  ["أرز مصري فاخر", "Premium Egyptian Rice", "الضحى", "El Duhá", "rice-pasta-grains", 58.5, "1 كجم"], ["مكرونة إسباجيتي", "Spaghetti Pasta", "الملكة", "El Maleka", "rice-pasta-grains", 24.95, "400 جم"], ["عدس أصفر", "Yellow Lentils", "أبو عوف", "Abu Auf", "rice-pasta-grains", 69.9, "500 جم"], ["فول مدمس سادة", "Plain Fava Beans", "حدائق كاليفورنيا", "California Garden", "canned-food", 38.5, "400 جم"],
  ["زيت دوار الشمس", "Sunflower Oil", "حلوة", "Helwa", "oils-ghee", 89.95, "1.5 لتر"], ["سمن نباتي", "Vegetable Ghee", "روابي", "Rawabi", "oils-ghee", 112, "700 جم"], ["صلصة طماطم", "Tomato Sauce", "هاينز", "Heinz", "canned-food", 35.5, "360 جم"], ["تونة قطع خفيفة", "Light Tuna Chunks", "دليسيو", "Delicio", "canned-food", 64.95, "185 جم"],
  ["عسل نحل طبيعي", "Pure Natural Honey", "النحال", "Al Nahal", "sugar-honey-jam", 145, "500 جم"], ["مربى فراولة", "Strawberry Jam", "بستاف", "Bostav", "sugar-honey-jam", 72.5, "400 جم"], ["سكر أبيض", "White Sugar", "السكر", "Al Sukkar", "sugar-honey-jam", 34.95, "1 كجم"], ["قهوة سادة", "Classic Ground Coffee", "بن شاهين", "Shaheen", "coffee-tea", 119, "250 جم"],
  ["فراولة طازجة", "Fresh Strawberries", "ملك ماركت فريش", "Malek Market Fresh", "fruits-vegetables", 49.99, "500 جم"], ["موز بلدي", "Local Bananas", "ملك ماركت فريش", "Malek Market Fresh", "fruits-vegetables", 39.9, "1 كجم"], ["تفاح أحمر", "Red Apples", "ملك ماركت فريش", "Malek Market Fresh", "fruits-vegetables", 89.9, "1 كجم"], ["طماطم بلدي", "Local Tomatoes", "ملك ماركت فريش", "Malek Market Fresh", "fruits-vegetables", 24.9, "1 كجم"], ["خيار بلدي", "Local Cucumbers", "ملك ماركت فريش", "Malek Market Fresh", "fruits-vegetables", 29.9, "1 كجم"], ["بطاطس للقلي", "Potatoes", "ملك ماركت فريش", "Malek Market Fresh", "fruits-vegetables", 27.5, "1 كجم"],
  ["لبن كامل الدسم", "Full Fat Milk", "جهينة", "Juhayna", "dairy-eggs", 43.95, "1 لتر"], ["زبادي طبيعي", "Plain Yogurt", "دانون", "Danone", "dairy-eggs", 12.5, "105 جم"], ["جبنة بيضاء", "White Cheese", "دومتي", "Domty", "dairy-eggs", 78.5, "500 جم"], ["بيض أبيض", "White Eggs", "بلدنا", "Baladna", "dairy-eggs", 79.95, "طبق 30"],
  ["صدور دجاج طازجة", "Fresh Chicken Breast", "ملك ماركت فريش", "Malek Market Fresh", "meat-poultry", 179.9, "1 كجم"], ["أوراك دجاج", "Chicken Thighs", "ملك ماركت فريش", "Malek Market Fresh", "meat-poultry", 139.9, "1 كجم"], ["لحم بقري مفروم", "Minced Beef", "ملك ماركت فريش", "Malek Market Fresh", "meat-poultry", 329, "1 كجم"],
  ["عصير برتقال طبيعي", "Natural Orange Juice", "بيتي", "Beyti", "juices", 32.5, "1 لتر"], ["مياه معدنية", "Mineral Water", "بركة", "Baraka", "water-soft-drinks", 68, "6 × 1.5 لتر"], ["مشروب غازي كولا", "Cola Soft Drink", "بيبسي", "Pepsi", "water-soft-drinks", 18.5, "1 لتر"],
  ["شوكولاتة بالحليب", "Milk Chocolate", "جالكسي", "Galaxy", "biscuits-chocolate", 42, "90 جم"], ["بسكويت سادة", "Plain Biscuits", "دجستيف", "Digestive", "biscuits-chocolate", 39.95, "400 جم"], ["مكسرات مشكلة", "Mixed Nuts", "أبو عوف", "Abu Auf", "snacks-sweets", 159, "250 جم"],
  ["خضار مشكل مجمد", "Mixed Frozen Vegetables", "فروزين", "Frozen", "frozen-food", 74.95, "400 جم"], ["بطاطس نصف مقلية", "French Fries", "ماك كين", "McCain", "frozen-food", 109, "750 جم"], ["آيس كريم فانيليا", "Vanilla Ice Cream", "كواليتي", "Kuwait", "frozen-food", 89.9, "1 لتر"],
  ["حفاضات أطفال مقاس 4", "Baby Diapers Size 4", "بامبرز", "Pampers", "baby-care", 389, "72 حفاضة"], ["مناديل مبللة للأطفال", "Baby Wet Wipes", "جونسون", "Johnson's", "baby-care", 74.5, "56 منديل"], ["شامبو للشعر الجاف", "Dry Hair Shampoo", "صانسيلك", "Sunsilk", "personal-care", 69.95, "600 مل"], ["معجون أسنان", "Toothpaste", "سيجنال", "Signal", "personal-care", 44.5, "100 مل"],
  ["مسحوق غسيل أوتوماتيك", "Automatic Laundry Detergent", "برسيل", "Persil", "home-care", 219, "2.5 كجم"], ["منظف أرضيات بالليمون", "Lemon Floor Cleaner", "بريل", "Pril", "home-care", 74.95, "1 لتر"], ["مناديل ورقية", "Facial Tissues", "فاين", "Fine", "paper-products", 49.9, "3 علب"], ["طعام قطط بالدجاج", "Chicken Cat Food", "ويسكاس", "Whiskas", "pet-supplies", 119, "1.2 كجم"], ["يانسون", "Anise", "العطار", "Al Attar", "herbs", 39.9, "100 جم"]
] as const;

const userJuiceProducts = [
  ["عصير مانجو B Natural", "B Natural Mango Juice", "B Natural", "B Natural", "juices", 58, "1 لتر"],
  ["عصير عنب أبيض Becker's Bester", "Becker's Bester White Grape Juice", "Becker's Bester", "Becker's Bester", "juices", 72, "1 لتر"],
  ["عصير عنب Welch's 100%", "Welch's 100% Grape Juice", "Welch's", "Welch's", "juices", 98, "1.89 لتر"],
  ["عصير عنب Snapple", "Snapple Grape Juice", "Snapple", "Snapple", "juices", 65, "473 مل"],
  ["عصير تفاح Hollinger", "Hollinger Apple Juice", "Hollinger", "Hollinger", "juices", 55, "1 لتر"],
  ["عصير مانجو Nada", "Nada Mango Juice", "Nada", "Nada", "juices", 42, "1 لتر"],
  ["نكتار مانجو الربيع", "Al Rabie Mango Nectar", "Al Rabie", "Al Rabie", "juices", 48, "1 لتر"],
  ["عصير مانجو Tutti Frutti", "Tutti Frutti Mango Juice", "Tutti Frutti", "Tutti Frutti", "juices", 39, "250 مل"],
  ["عصير تفاح White House", "White House Apple Juice", "White House", "White House", "juices", 88, "1.89 لتر"],
  ["مشروب مانجو Maza", "Maza Mango Juice Drink", "Maza", "Maza", "juices", 25, "330 مل"],
  ["عصير تفاح Mott's الطبيعي", "Mott's Natural Apple Juice", "Mott's", "Mott's", "juices", 110, "1.89 لتر"],
] as const;

async function main() {
  const categoryIds = new Map<string, number>();
  for (const [nameAr, nameEn, slug, parentSlug] of categories) {
    const parentId = parentSlug ? categoryIds.get(parentSlug) : undefined;
    const category = await prisma.category.upsert({ where: { slug }, update: { nameAr, nameEn, parentId }, create: { nameAr, nameEn, slug, parentId } });
    categoryIds.set(slug, category.id);
  }
  for (const [nameAr, nameEn, brandAr, brandEn, categorySlug, price, unit] of [...products, ...userJuiceProducts]) {
    const slug = `${nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${unit.replace(/\s/g, "-")}`;
    const image = productImage(nameEn, categorySlug);
    await prisma.product.upsert({ where: { slug }, update: { price, unit, stock: 100, image }, create: { nameAr, nameEn, slug, brandAr, brandEn, price, unit, stock: 100, image, categoryId: categoryIds.get(categorySlug)! } });
  }
}

main().finally(() => prisma.$disconnect());


