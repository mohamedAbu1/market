export type ImageProduct = {
  id: number; name: string; nameEn: string; brand: string; brandEn: string;
  category: string; categorySlug: string; price: number; oldPrice?: number;
  unit: string; unitEn: string; image: string; color: string; rating: number;
  badge?: string; badgeEn?: string; description: string; descriptionEn: string;
};
const labels: Record<string, [string, string, string, string]> = {
  juices: ["مشروبات", "Beverages", "عصير", "Juice"], "water-soft-drinks": ["مشروبات", "Beverages", "مشروب منعش", "Refreshing drink"],
  "personal-care": ["عناية شخصية", "Personal Care", "منتج عناية يومية", "Daily care product"], "oils-ghee": ["بقالة", "Grocery", "زيت طبخ", "Cooking oil"],
  "sugar-honey-jam": ["بقالة", "Grocery", "منتج أساسي للمطبخ", "Pantry essential"], "fruits-vegetables": ["خضار وفاكهة", "Fruits & Vegetables", "منتج طازج", "Fresh produce"],
  "home-care": ["عناية بالمنزل", "Home Care", "مستلزم منزلي", "Home essential"], "dairy-eggs": ["ألبان وأجبان", "Dairy & Eggs", "منتج طازج للفطور", "Fresh breakfast essential"],
  "meat-poultry": ["لحوم ودواجن", "Meat & Poultry", "اختيار طازج", "Fresh selection"]
};
const asset = (name: string) => `/products/imported/${name}`;
type Raw = [string,string,string,string,number,string,string,string];
const raw: Raw[] = [
["عصير مانجو توتي فروتي","Tutti Frutti Mango Juice","Tutti Frutti","juices",39,"250 مل","d9d55cc638cc57fbde66380c769180c7.png","#fff0d6"],
["عصير تفاح وايت هاوس لايت","White House Light Apple Juice","White House","juices",88,"1.89 لتر","e1a4a0feea8a68d3e388af15eb0b0cde.png","#fff4d7"],
["مشروب مانجو مازا","Maza Mango Juice Drink","Maza","juices",25,"330 مل","e29aa5b5c2d6dd2db8700b59fefaf8e2.png","#fff0c2"],
["عصير تفاح موتس الطبيعي","Mott's Natural Apple Juice","Mott's","juices",110,"1.89 لتر","f6c8a5a75c7e268f6afb6e67e9d28a21.png","#fff0d8"],
["شامبو هوجو بزبدة الشيا والشوفان","Hugo Shea Butter & Oatmeal Shampoo","Hugo Naturals","personal-care",189,"355 مل","fbf209c01bbd90dfdcc374964e45d09d.png","#f6eee4"],
["عصير مانجو بي ناتشورال","B Natural Mango Juice","B Natural","juices",58,"1 لتر","fd8e6567ffa4620c49294e0a9a6a2ae1.png","#fff0bd"],
["بيبسي كان","Pepsi Can","Pepsi","water-soft-drinks",22,"330 مل","2b5a8f657dc88a59f6e545136b0e891c.png","#e8f3ff"],
["باذنجان طازج","Fresh Eggplant","Malek Market Fresh","fruits-vegetables",32,"1 كجم","2d09bba94e2cb8f67624786d6104cb6c.png","#f4ebff"],
["بروكلي طازج","Fresh Broccoli","Malek Market Fresh","fruits-vegetables",59,"500 جم","2e97365ca32025b47469a86de4dc8803.png","#eaf8e7"],
["زيت طبخ إيفا","Eva Cooking Oil","Eva","oils-ghee",299,"5 لتر","2fda3d86082ff1e8e595a2e0d4d12305.png","#fff8d9"],
["بطيخ طازج","Fresh Watermelon","Malek Market Fresh","fruits-vegetables",45,"1 كجم","4efb6ebbb8cd3b6216202e0a41214707.png","#e9f8e8"],
["عصير عنب أبيض بيكرز بيستر","Becker's Bester White Grape Juice","Becker's Bester","juices",72,"1 لتر","5f93844ef078446321d1a1627b552b84.png","#eff9c7"],
["بيبسي زجاجة","Pepsi Bottle","Pepsi","water-soft-drinks",35,"500 مل","7eabf49374335f520535648b5fbac2d9.png","#e5f2ff"],
["عصير عنب ويلتش 100%","Welch's 100% Grape Juice","Welch's","juices",98,"1.89 لتر","7f9b6c5c9f62bb899f3cb26e71632551.png","#f1eaff"],
["شامبو شرقي هير ساينس","Oriental Hair Science Shampoo","Hair Science","personal-care",149,"500 مل","8d77e6ab02bc4f8c1e5cf2e9fd23e122.png","#eaf3df"],
["جرجير طازج","Fresh Arugula","Malek Market Fresh","fruits-vegetables",15,"حزمة","9e9c8ad663340c990779408e57184f13.png","#eaf8e8"],
["كوكاكولا 2 لتر","Coca-Cola 2L","Coca-Cola","water-soft-drinks",49,"2 لتر","26b34fce998e22357d917ce19e2cf67c.png","#ffe9e9"],
["تفاح أحمر طازج","Fresh Red Apple","Malek Market Fresh","fruits-vegetables",89,"1 كجم","351b494546beef531645a401b64cb392.png","#ffe8e8"],
["شامبو هيد آند شولدرز","Head & Shoulders Shampoo","Head & Shoulders","personal-care",165,"600 مل","894cbd787c97f105acfa9df9d9d25054.png","#e9f5ff"],
["سكر أبيض ناعم","Fine White Sugar","Al Sukkar","sugar-honey-jam",34.95,"1 كجم","27684b45f3a9d81241571901da751ba1.png","#fffaf0"],
["عصير عنب سنابل","Snapple Grape Juice","Snapple","juices",65,"473 مل","54869186d7db2b0318f3a4578e77d4f9.png","#f1e7ff"],
["منظف ومرطب جيروفيتال","Gerovital H3 Moisturizing Cleanser","Gerovital","personal-care",225,"400 مل","433924328bc61417ba5abf8d02ea1700.png","#edf5ff"],
["زيت دوار الشمس فيوريل","Viorelli Sunflower Oil","Viorelli","oils-ghee",169,"3 لتر","a7cf57269623f8fa85ae77a52bd3d983.png","#fff8d8"],
["نكتار مانجو الربيع","Al Rabie Mango Nectar","Al Rabie","juices",48,"1 لتر","c6e2f477749a5e890eb50617366ddfbf.png","#fff0d8"],
["عصير تفاح هولينجر","Hollinger Apple Juice","Hollinger","juices",55,"1 لتر","aa6hsehvb.png","#fff7df"],
["عصير مانجو ندى","Nada Mango Juice","Nada","juices",42,"1 لتر","c1c0566f9155d5e9db1dcb445f368eb4.png","#fff0ce"],
];
raw.push(
["فلفل أحمر حار","Fresh Red Chili Pepper","Malek Market Fresh","fruits-vegetables",29,"250 جم","8292f78e2a2d5512514251deba1e903b.png","#ffe9e4"],
["بنجر طازج","Fresh Beetroot","Malek Market Fresh","fruits-vegetables",35,"1 كجم","10c752ff43ac4a66b51477a8b1ae8d4c.png","#fff0f4"],
["موز بلدي","Local Banana Bunch","Malek Market Fresh","fruits-vegetables",39.9,"1 كجم","banana-bunch.png","#fff8d9"],
["مانجو طازجة","Fresh Mango","Malek Market Fresh","fruits-vegetables",75,"1 كجم","4dd8ed03e442cecae65e53ca7f4e4c04.png","#fff0c8"],
["جزر طازج","Fresh Carrots","Malek Market Fresh","fruits-vegetables",24,"1 كجم","7ab1c053be6871defc2f47fe72d7dede.png","#fff0e1"],
["لفت أبيض طازج","Fresh White Turnip","Malek Market Fresh","fruits-vegetables",22,"1 كجم","9b4eec2efd12cd97da2adee5eaf84d8a.png","#f4f8ee"],
["طماطم طازجة","Fresh Tomatoes","Malek Market Fresh","fruits-vegetables",24.9,"1 كجم","59b878b95aedce528b2ef4348600c7c2.png","#ffeae5"],
["خضار مشكلة طازجة","Fresh Mixed Vegetables","Malek Market Fresh","fruits-vegetables",69,"1 كجم","af35de869e3224738ef0335d51007d81.png","#eef8e9"],
["بطاطس طازجة","Fresh Potatoes","Malek Market Fresh","fruits-vegetables",27.5,"1 كجم","d53f27f3c88025041289959a2d0adf1f.png","#fff4dd"],
["صابون أطباق سائل","Liquid Dish Soap","Malek Home","home-care",55,"500 مل","f7fa61ec8133a55ba7d8116fe64d573e.png","#fff0cd"],
["كوكاكولا زجاجة زجاج","Coca-Cola Glass Bottle","Coca-Cola","water-soft-drinks",20,"300 مل","e162a1af2a2179a27945eeb0c5a0b359.png","#ffe5e5"],
["فراولة طازجة","Fresh Strawberries","Malek Market Fresh","fruits-vegetables",49.99,"500 جم","8437ed2843e790fd2df2bbea04ed2608.png","#ffe8ed"],
["خيار طازج","Fresh Cucumbers","Malek Market Fresh","fruits-vegetables",29.9,"1 كجم","d308d8097a8eeefd206ed200841a104c.png","#eaf8e9"],
["لبن كامل الدسم من المزرعة","Farm Fresh Full Fat Milk","Farm Fresh","dairy-eggs",52,"1 لتر","5a7d461de2097d318dcd8658afa35722.png","#f7f3e8"],
["بيض بلدي أبيض","Farm White Eggs","Baladna","dairy-eggs",79.95,"طبق 30","346b35fc4b042e6989b07dc3ada1ab50.png","#fff1df"],
["فلفل ألوان مشكل","Mixed Bell Peppers","Malek Market Fresh","fruits-vegetables",79,"500 جم","cd7cede7b81323eca5a6a5ba7946f2fb.png","#fff0dd"],
["شرائح لحم بقري","Beef Steak Cuts","Malek Market Fresh","meat-poultry",399,"1 كجم","d42b1d5abde6cf2e32a4aa3a6a8c0c9c.png","#fff0ed"],
["خس روماني طازج","Fresh Romaine Lettuce","Malek Market Fresh","fruits-vegetables",34,"حبة","c56e8ed2da4700798de4b97171449c1d.png","#ebf9e7"],
["ستيك لحم بالروزماري","Rosemary Beef Steaks","Malek Market Fresh","meat-poultry",425,"1 كجم","79500218295ad5893b6513d1f6722c3d.png","#fff0ed"],
["قرنبيط طازج","Fresh Cauliflower","Malek Market Fresh","fruits-vegetables",45,"حبة","f8be69efe62c9f053b4a9f8d4a62d560.png","#f5fae9"],
["عنب أحمر طازج","Fresh Red Grapes","Malek Market Fresh","fruits-vegetables",89,"500 جم","18f07d6aa264f1094d5b53a0cf9e0e58.png","#f4eafa"],
["كرنب أحمر طازج","Fresh Red Cabbage","Malek Market Fresh","fruits-vegetables",35,"حبة","a62161208ae75a1bb4c5b1d8aec44164.png","#f9eafa"],
["صندوق فواكه وخضار مشكل","Mixed Fruit & Vegetable Box","Malek Market Fresh","fruits-vegetables",199,"صندوق","c55ecfe5d981377aeb637b2766cd8faf.png","#eef8e9"],
["عنب أخضر طازج","Fresh Green Grapes","Malek Market Fresh","fruits-vegetables",85,"500 جم","507c7202c4df62663aa338322e534115.png","#edf8df"],
["دجاجة كاملة طازجة","Fresh Whole Chicken","Malek Market Fresh","meat-poultry",189,"1 كجم","3183726f3fa21086eb5869ad1504a4d6.png","#fff0ea"],["صدور دجاج طازجة","Fresh Chicken Breast","Malek Market Fresh","meat-poultry",179.9,"1 كجم","87fe46b819d65683d555a3e4b54b9ec3.png","#fff0ea"]
,["كرنب أخضر طازج","Fresh Green Cabbage","Malek Market Fresh","fruits-vegetables",29,"حبة","0d1353da2f66b0b469099262015922cc.png","#eef8e9"]
,["بصل أحمر طازج","Fresh Red Onion","Malek Market Fresh","fruits-vegetables",26,"1 كجم","79c32b6e05984c24d8f7e38514bc46bb.png","#f8eafa"]
);
const englishUnit = (unit: string) => unit.replace("كجم", "kg").replace("جم", "g").replace("لتر", "L").replace("مل", "ml").replace("حبة", "piece").replace("حزمة", "bunch").replace("طبق 30", "30 eggs").replace("صندوق", "box");
export const imageProducts: ImageProduct[] = raw.map(([name,nameEn,brand,categorySlug,price,unit,file,color], index) => {
  const [category, categoryEn, description, descriptionEn] = labels[categorySlug];
  const featured = index % 5 === 0;
  return { id: 101 + index, name, nameEn, brand, brandEn: brand, category, categorySlug, price, oldPrice: featured ? Math.round(price * 1.12 * 100) / 100 : undefined, unit, unitEn: englishUnit(unit), image: asset(file), color, rating: Number((4.3 + (index % 6) / 10).toFixed(1)), badge: featured ? "اختيار مميز" : undefined, badgeEn: featured ? "Featured" : undefined, description: `${description} عالي الجودة للاستخدام اليومي.`, descriptionEn: `${descriptionEn} selected for quality and everyday use.` };
});


