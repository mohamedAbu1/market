"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Heart, MapPin, Minus, Plus, Search, ShoppingBag, Star, Trash2, UserRound, X, ArrowRight, ArrowLeft, Truck, Leaf, CheckCircle2, Instagram, Facebook, Mail, Phone, ShieldCheck } from "lucide-react";
import { categories, products as fallbackProducts, type Product } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import BrandLogo from "@/components/BrandLogo";

const categoryImages: Record<string, string> = { "خضار وفاكهة": "/product-icons/produce-3d.png", "ألبان وأجبان": "/product-icons/milk-3d.png", بقالة: "/product-icons/rice-bag-3d.png", مشروبات: "/product-icons/orange-juice-3d.png", "لحوم ودواجن": "/product-icons/chicken-3d.png", مجمدات: "/product-icons/frozen-food-3d.png", "عناية بالمنزل": "/product-icons/cleaner-3d.png" };
const money = (value: number, en: boolean) => value.toFixed(2) + " " + (en ? "EGP" : "ج.م");
const productIcon = (product: Product) => {
  const text = (product.name + " " + (product.nameEn ?? "")).toLocaleLowerCase();
  if (product.image.startsWith("/product-icons/")) return product.image;
  if (text.includes("حليب كامل الدسم الطازج") || text.includes("fresh full fat milk")) return "/product-icons/milk-carton-3d.png";
  if (text.includes("بيض أبيض بلدي") || text.includes("farm fresh white eggs")) return "/product-icons/egg-carton-3d.png";
  if (text.includes("زبادي بالفراولة") || text.includes("strawberry yogurt cup")) return "/product-icons/yogurt-cup-3d.png";
  if (text.includes("جبن شيدر") || text.includes("premium cheddar cheese")) return "/product-icons/cheddar-wedge-3d.png";
  if (text.includes("زبدة طبيعية") || text.includes("natural butter")) return "/product-icons/butter-3d.png";
  if (text.includes("قشطة طازجة") || text.includes("fresh cream")) return "/product-icons/cream-bottle-3d.png";
  if (text.includes("خضروات مشكلة مجمدة") || text.includes("frozen mixed vegetables")) return "/product-icons/frozen-mixed-vegetables-3d.png";
  if (text.includes("بيتزا") && (text.includes("مجمد") || text.includes("frozen"))) return "/product-icons/frozen-pizza-3d.png";
  if (text.includes("ناجتس") || text.includes("nuggets")) return "/product-icons/frozen-nuggets-3d.png";
  if (text.includes("أصابع سمك") || text.includes("fish sticks")) return "/product-icons/frozen-fish-sticks-3d.png";
  if (text.includes("ذرة حلوة مجمدة") || text.includes("frozen sweet corn")) return "/product-icons/frozen-corn-3d.png";
  if (text.includes("آيس كريم فراولة") || text.includes("strawberry vanilla ice cream")) return "/product-icons/frozen-ice-cream-3d.png";
  if (text.includes("زيت زيتون") || text.includes("olive oil")) return "/product-icons/olive-oil-3d.png";
  if (text.includes("زيت") || text.includes("oil")) return "/product-icons/sunflower-oil-3d.png";
  if (text.includes("أرز") || text.includes("rice")) return "/product-icons/rice-bag-3d.png";
  if (text.includes("فراول") || text.includes("strawberr")) return "/product-icons/strawberries-3d.png";
  if (text.includes("detergent")) return "/product-icons/detergent-3d.png";
  if (text.includes("منظف") || text.includes("cleaner")) return "/product-icons/cleaner-3d.png";
  if ((text.includes("مانجو") && (text.includes("عصير") || text.includes("نكتار"))) || text.includes("mango juice") || text.includes("mango nectar")) return "/product-icons/mango-juice-3d.png";
  if (text.includes("لبن") || text.includes("milk")) return "/product-icons/milk-3d.png";
  if (text.includes("دجاجة كاملة") || text.includes("whole chicken")) return "/product-icons/whole-chicken-3d.png";
  if (text.includes("دجاج") || text.includes("chicken")) return "/product-icons/chicken-3d.png";
  if (text.includes("شوكولات") || text.includes("chocolate")) return "/product-icons/chocolate-3d.png";
  if (text.includes("تفاح") && (text.includes("عصير") || text.includes("juice"))) return "/product-icons/apple-juice-3d.png";
  if (text.includes("بيبسي") || text.includes("pepsi")) return "/product-icons/pepsi-can-3d.png";
  if (text.includes("موز") || text.includes("banana")) return "/product-icons/bananas-3d.png";
  if (text.includes("بيض") || text.includes("egg")) return "/product-icons/eggs-3d.png";
  if (text.includes("صندوق فواكه") || text.includes("mixed fruit") || text.includes("mixed produce")) return "/product-icons/mixed-produce-box-3d.png";
  if (text.includes("خضار مشكلة") || text.includes("mixed vegetables")) return "/product-icons/mixed-vegetables-3d.png";
  if (text.includes("باذنجان") || text.includes("eggplant")) return "/product-icons/eggplant-3d.png";
  if (text.includes("بنجر") || text.includes("شمندر") || text.includes("beetroot")) return "/product-icons/beetroot-3d.png";
  if (text.includes("جزر") || text.includes("carrot")) return "/product-icons/carrots-3d.png";
  if (text.includes("بروكلي") || text.includes("broccoli")) return "/product-icons/broccoli-3d.png";
  if (text.includes("جرجير") || text.includes("arugula")) return "/product-icons/arugula-3d.png";
  if (text.includes("لفت") || text.includes("turnip")) return "/product-icons/turnip-3d.png";
  if (text.includes("خس") || text.includes("romaine") || text.includes("lettuce")) return "/product-icons/romaine-lettuce-3d.png";
  if (text.includes("كرنب أحمر") || text.includes("كرنب احمر") || text.includes("red cabbage")) return "/product-icons/red-cabbage-3d.png";
  if (text.includes("كرنب أخضر") || text.includes("كرنب اخضر") || text.includes("green cabbage")) return "/product-icons/green-cabbage-3d.png";
  if (text.includes("خضار") || text.includes("vegetable")) return "/product-icons/produce-3d.png";
  if (text.includes("مكرون") || text.includes("pasta")) return "/product-icons/pasta-3d.png";
  if (text.includes("قهو") || text.includes("coffee")) return "/product-icons/coffee-3d.png";
  if (text.includes("سكر") || text.includes("sugar")) return "/product-icons/sugar-3d.png";
  if (text.includes("مناديل") || text.includes("tissue")) return "/product-icons/tissues-3d.png";
  if (text.includes("شامبو") || text.includes("shampoo")) return "/product-icons/shampoo-3d.png";
  if (text.includes("حفاض") || text.includes("diaper")) return "/product-icons/diapers-3d.png";
  if (text.includes("خضروات مشكلة مجمدة") || text.includes("frozen mixed vegetables")) return "/product-icons/frozen-mixed-vegetables-3d.png";
  if (text.includes("بيتزا") && (text.includes("مجمد") || text.includes("frozen"))) return "/product-icons/frozen-pizza-3d.png";
  if (text.includes("ناجتس") || text.includes("nuggets")) return "/product-icons/frozen-nuggets-3d.png";
  if (text.includes("أصابع سمك") || text.includes("fish sticks")) return "/product-icons/frozen-fish-sticks-3d.png";
  if (text.includes("ذرة حلوة مجمدة") || text.includes("frozen sweet corn")) return "/product-icons/frozen-corn-3d.png";
  if (text.includes("آيس كريم فراولة") || text.includes("strawberry vanilla ice cream")) return "/product-icons/frozen-ice-cream-3d.png";
  if (text.includes("مجمد") || text.includes("frozen")) return "/product-icons/frozen-vegetables-3d.png";
  if (text.includes("كولا") || text.includes("cola")) return "/product-icons/cola-3d.png";
  if (text.includes("آيس") || text.includes("ice cream")) return "/product-icons/ice-cream-3d.png";
  if (text.includes("معجون") || text.includes("toothpaste")) return "/product-icons/toothpaste-3d.png";
  if (text.includes("أطباق") || text.includes("dish soap")) return "/product-icons/dish-soap-3d.png";
  if (text.includes("صابون") || text.includes("soap")) return "/product-icons/soap-3d.png";
  if (text.includes("حيوان") || text.includes("pet")) return "/product-icons/pet-food-3d.png";
  if (text.includes("عدس") || text.includes("lentil")) return "/product-icons/lentils-3d.png";
  if (text.includes("عسل") || text.includes("honey")) return "/product-icons/honey-3d.png";
  if (text.includes("بسكويت") || text.includes("biscuit")) return "/product-icons/biscuits-3d.png";
  if (text.includes("مربى") || text.includes("jam")) return "/product-icons/jam-3d.png";
  if (text.includes("أعشاب") || text.includes("herb")) return "/product-icons/herbs-3d.png";
  if (text.includes("بطيخ") || text.includes("watermelon")) return "/product-icons/watermelon-3d.png";
  if (text.includes("تفاح") || text.includes("apple")) return "/product-icons/apples-3d.png";
  if (text.includes("عنب أخضر") || text.includes("عنب اخضر") || text.includes("green grapes")) return "/product-icons/green-grapes-3d.png";
  if (text.includes("عنب") || text.includes("grape")) return "/product-icons/grapes-3d.png";
  if (text.includes("مانجو") || text.includes("mango")) return "/product-icons/mango-3d.png";
  if (text.includes("بطاط") || text.includes("potato")) return "/product-icons/potatoes-3d.png";
  if (text.includes("بصل أحمر") || text.includes("بصل احمر") || text.includes("red onion")) return "/product-icons/red-onion-3d.png";
  if (text.includes("بصل") || text.includes("onion")) return "/product-icons/onion-3d.png";
  if (text.includes("خيار") || text.includes("cucumber")) return "/product-icons/cucumber-3d.png";
  if (text.includes("طماطم") || text.includes("tomato")) return "/product-icons/tomatoes-3d.png";
  if (text.includes("حار") || text.includes("chili")) return "/product-icons/chili-peppers-3d.png";
  if (text.includes("فلفل") || text.includes("pepper")) return "/product-icons/peppers-3d.png";
  if (text.includes("قرنبيط") || text.includes("cauliflower")) return "/product-icons/cauliflower-3d.png";
  if (text.includes("كرنب") || text.includes("cabbage")) return "/product-icons/cabbage-3d.png";
  if (text.includes("ليمون") || text.includes("lemon")) return "/product-icons/lemons-3d.png";
  if (text.includes("فاصوليا") || text.includes("bean")) return "/product-icons/green-beans-3d.png";
  if (text.includes("جبن") || text.includes("cheese")) return "/product-icons/cheese-3d.png";
  if (text.includes("زبادي") || text.includes("yogurt")) return "/product-icons/yogurt-3d.png";
  if (text.includes("مياه") || text.includes("water")) return "/product-icons/water-3d.png";
  if (text.includes("تونة") || text.includes("tuna")) return "/product-icons/tuna-3d.png";
  if (text.includes("بطاطس مقلية") || text.includes("fries")) return "/product-icons/fries-3d.png";
  if (text.includes("أفوكادو") || text.includes("avocado")) return "/product-icons/avocado-3d.png";
  if (text.includes("لحم") || text.includes("beef")) return "/product-icons/beef-3d.png";
  if (text.includes("خبز") || text.includes("bread")) return "/product-icons/bread-3d.png";
  if (text.includes("مكسرات") || text.includes("nuts")) return "/product-icons/nuts-3d.png";
  if (text.includes("صلصة") || text.includes("sauce")) return "/product-icons/tomato-sauce-3d.png";
  if (text.includes("فاصوليا معلب") || text.includes("canned beans")) return "/product-icons/beans-can-3d.png";
  if (text.includes("عصير") || text.includes("juice")) return "/product-icons/orange-juice-3d.png";
  return product.image;
};

export default function Home() {
  const { cart, add, remove, count } = useCart();
  const { lang } = useLanguage();
  const en = lang === "en";
  const [catalog, setCatalog] = useState<Product[]>(fallbackProducts);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [heroSlide, setHeroSlide] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [address, setAddress] = useState(en ? "Maadi, Cairo" : "المعادي، القاهرة");
  useEffect(() => { document.documentElement.lang = en ? "en" : "ar"; document.documentElement.dir = en ? "ltr" : "rtl"; }, [en]);
  useEffect(() => { fetch("/api/products").then(r => r.ok ? r.json() : Promise.reject()).then((remote: Product[]) => { const remoteNames = new Set(remote.map(p => p.nameEn ?? p.name)); setCatalog([...remote, ...fallbackProducts.filter(p => !remoteNames.has(p.nameEn ?? p.name))]); }).catch(() => setCatalog(fallbackProducts)); }, []);
  const visible = useMemo(() => catalog.filter(p => { const text = (p.name + " " + (p.nameEn ?? "") + " " + p.brand + " " + p.category).toLocaleLowerCase(); return (activeCategory === "الكل" || p.category === activeCategory) && (!query || text.includes(query.toLocaleLowerCase())); }).slice(0, 8), [catalog, activeCategory, query]);
  const cartItems = catalog.filter(p => cart[p.id]);
  const total = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const matches = (p: Product) => { const text = (p.name + " " + (p.nameEn ?? "") + " " + p.brand + " " + p.category).toLocaleLowerCase(); return (activeCategory === "الكل" || p.category === activeCategory) && (!query || text.includes(query.toLocaleLowerCase())); };
  const deals = catalog.filter(p => p.oldPrice && matches(p)).slice(0, 6);
  const allProducts = catalog.filter(matches);
  const scrollProducts = () => document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });

  return <main className={`freshcart-page ${en ? "is-en" : "is-ar"}`}>
    <header className="fresh-header"><div className="fresh-container header-row"><BrandLogo compact /><button className="fresh-location" onClick={() => setLocationOpen(true)}><MapPin size={19} fill="currentColor" /><span><small>{en ? "Deliver to" : "التوصيل إلى"}</small><b>{address}</b></span><ChevronDown size={16} /></button><div className="fresh-search"><Search size={22} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder={en ? "Search for products" : "ابحث عن المنتجات"} aria-label={en ? "Search products" : "البحث عن المنتجات"} /></div><div className="fresh-actions"><LanguageToggle /><ThemeToggle /><a href="/login"><UserRound size={25} /><span>{en ? "Account" : "حسابي"}</span></a><button onClick={() => setFavoritesOpen(true)}><Heart size={27} /><span>{en ? "Favorites" : "المفضلة"}</span><b className="favorites-count">{favorites.length}</b></button><button className="fresh-cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={29} /><span>{money(total, en)}</span><b>{count}</b></button></div></div></header>
    <div className="fresh-container fresh-layout">
      <div className="fresh-main">
        <section className="fresh-hero"><div className="hero-text"><span className="hero-kicker"><Leaf size={17} /> {en ? "Fresh for a brighter tomorrow" : "طازة ليوم أحلى"}</span><h1>{en ? <>Fresh groceries,<br /><strong>delivered to your door</strong></> : <>بقالة طازة،<br /><strong>لحد باب بيتك</strong></>}</h1><p>{en ? "Quality food. Happier days. A fresher tomorrow." : "أكل بجودة تفرحك، وأيام أحلى، وتوصيل لحد عندك."}</p><button className="shop-now" onClick={scrollProducts}>{en ? "Shop Now" : "تسوق الآن"} <ArrowRight size={21} /></button><div className="hero-dots" aria-label={en ? "Hero slides" : "شرائح العرض الرئيسي"}>{[0, 1, 2].map(index => <button key={index} className={heroSlide === index ? "selected" : ""} onClick={() => setHeroSlide(index)} aria-label={en ? `Show slide ${index + 1}` : `عرض الشريحة ${index + 1}`} />)}</div></div><div className="hero-scene"><img className="generated-hero-mascot" src="/malek-hero-mascot.png" alt={en ? "FreshCart mascot holding fresh groceries" : "شخصية ملك ماركت تحمل أكياس الخضروات الطازجة"} /><span className="scene-copy">{en ? <>Fresh<br />for a brighter<br />tomorrow ♥</> : <>طازة<br />ليوم أحلى<br />معاك ♥</>}</span></div></section>
        <section className="fresh-categories"><CategoryStrip en={en} active={activeCategory} setActive={setActiveCategory} /></section>
        <section id="deals" className="fresh-deals"><div className="fresh-section-title"><div><h2>{en ? "Today's Deals" : "عروض اليوم"}</h2><p>{en ? "Fresh savings for a better tomorrow" : "وفر أكتر على احتياجاتك اليومية"}</p></div><button onClick={() => { setActiveCategory("الكل"); setQuery(""); scrollProducts(); }}>{en ? "See All" : "عرض الكل"} <ArrowLeft size={18} /></button></div><div className="deal-grid">{(deals.length ? deals : visible).slice(0, 6).map((p, i) => <DealCard key={p.id} product={p} en={en} discount={15 + i * 3} quantity={cart[p.id] || 0} favorite={favorites.includes(p.id)} onAdd={() => add(p.id)} onRemove={() => remove(p.id)} onFavorite={() => setFavorites(f => f.includes(p.id) ? f.filter(id => id !== p.id) : [...f, p.id])} />)}</div>{!deals.length && !visible.length && <div className="fresh-empty-results"><Search size={28} /><b>{en ? "No products found" : "لم نعثر على منتجات"}</b><span>{en ? "Try another search or category." : "جرّب كلمة بحث أو فئة أخرى."}</span></div>}</section>
        {allProducts.length > 6 && <section className="fresh-catalog"><div className="fresh-section-title"><div><h2>{en ? "Shop all products" : "كل المنتجات"}</h2><p>{en ? `${allProducts.length} products with dedicated 3D artwork` : `${allProducts.length} منتجًا بأيقونات ثلاثية الأبعاد مخصصة`}</p></div></div><div className="deal-grid catalog-grid">{allProducts.slice(6).map(p => <DealCard key={`catalog-${p.id}`} product={p} en={en} quantity={cart[p.id] || 0} favorite={favorites.includes(p.id)} onAdd={() => add(p.id)} onRemove={() => remove(p.id)} onFavorite={() => setFavorites(f => f.includes(p.id) ? f.filter(id => id !== p.id) : [...f, p.id])} />)}</div></section>}
      </div>
      <aside className="fresh-sidebar"><CartPanel en={en} items={cartItems} cart={cart} total={total} add={add} remove={remove} open={() => setCartOpen(true)} checkout={() => setCheckoutOpen(true)} /><div className="delivery-card"><div><Truck size={27} /><b>{en ? "Fast delivery" : "توصيل سريع"}</b></div><div><Leaf size={27} /><b>{en ? "Fresh quality" : "جودة تفرحك"}</b></div><ul><li><CheckCircle2 size={15} /> {en ? "Same-day delivery" : "توصيل في نفس اليوم"}</li><li><CheckCircle2 size={15} /> {en ? "Handpicked freshness" : "منتجات مختارة بعناية"}</li><li><CheckCircle2 size={15} /> {en ? "100% satisfaction" : "رضاك يهمنا ١٠٠٪"}</li></ul><div className="delivery-art"><img src="/malek-delivery-banner.png" alt={en ? "Fast delivery and fresh quality" : "توصيل سريع وجودة طازجة"} /></div><strong className="delivery-slogan">{en ? <>Good food<br />closer to you :)</> : <>أكل حلو<br />أقرب ليك :)</>}</strong></div></aside>
    </div>
    <footer className="fresh-footer"><div className="fresh-container footer-grid"><div className="footer-brand"><BrandLogo light /><p>{en ? "Fresh groceries, delivered with care to your door." : "بقالة طازة، بتوصيل يهتم بكل تفصيلة لحد باب بيتك."}</p><div className="footer-social"><a href="#" aria-label="Instagram"><Instagram size={17} /></a><a href="#" aria-label="Facebook"><Facebook size={17} /></a><a href="mailto:support@malekmarket.com" aria-label="Email"><Mail size={17} /></a></div></div><div><h3>{en ? "Shop" : "تسوق"}</h3><a href="#deals">{en ? "Today's deals" : "عروض اليوم"}</a><a href="#deals">{en ? "Fresh produce" : "الخضار والفاكهة"}</a><a href="#deals">{en ? "Dairy & eggs" : "الألبان والبيض"}</a></div><div><h3>{en ? "Customer care" : "خدمة العملاء"}</h3><a href="/login">{en ? "My account" : "حسابي"}</a><a href="#deals">{en ? "Delivery information" : "معلومات التوصيل"}</a><a href="#deals">{en ? "Help center" : "مركز المساعدة"}</a></div><div className="footer-contact"><h3>{en ? "Need help?" : "تحتاج مساعدة؟"}</h3><p><Phone size={16} /> 19999</p><p><Mail size={16} /> support@malekmarket.com</p><span><ShieldCheck size={17} /> {en ? "Secure checkout" : "دفع آمن ومضمون"}</span></div></div><div className="fresh-container footer-bottom"><span>© 2026 Malek Market — {en ? "All rights reserved" : "جميع الحقوق محفوظة"}</span><span>{en ? "Fresh choices. Happier days." : "اختيارات طازة، وأيام أحلى."}</span></div></footer>
    {cartOpen && <CartDrawer en={en} items={cartItems} cart={cart} total={total} add={add} remove={remove} close={() => setCartOpen(false)} checkout={() => { setCartOpen(false); setCheckoutOpen(true); }} />}
    {favoritesOpen && <FavoritesDrawer en={en} items={catalog.filter(p => favorites.includes(p.id))} add={add} close={() => setFavoritesOpen(false)} />}
    {locationOpen && <LocationModal en={en} address={address} setAddress={setAddress} close={() => setLocationOpen(false)} />}
    {checkoutOpen && <CheckoutModal en={en} items={cartItems} total={total} close={() => setCheckoutOpen(false)} />}
  </main>;
}

function CategoryStrip({ en, active, setActive }: { en: boolean; active: string; setActive: (v: string) => void }) { return <div className="category-strip">{categories.slice(0, 6).map(c => <button key={c.name} className={"fresh-category " + c.tone} onClick={() => { setActive(c.name); document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" }); }}><div><img src={categoryImages[c.name] || "/products/rice.svg"} alt={en ? c.nameEn : c.name} /></div><b>{en ? c.nameEn : c.name}</b></button>)}</div>; }
function DealCard({ product, en, discount, quantity, favorite, onAdd, onRemove, onFavorite }: { product: Product; en: boolean; discount?: number; quantity: number; favorite: boolean; onAdd: () => void; onRemove: () => void; onFavorite: () => void }) { return <article className="deal-card"><div className="deal-art">{discount ? <span className="deal-discount">-{discount}%</span> : null}<button className={"deal-heart " + (favorite ? "selected" : "")} onClick={onFavorite} aria-label={en ? "Favorite product" : "إضافة للمفضلة"}><Heart size={17} fill={favorite ? "currentColor" : "none"} /></button><img src={productIcon(product)} alt={en ? product.nameEn : product.name} /></div><h3>{en ? product.nameEn : product.name}</h3><small>{en ? product.unitEn : product.unit}</small><div className="deal-rating"><Star size={14} fill="currentColor" /> {product.rating} <span>({Math.floor(product.rating * 75)})</span></div><div className="deal-bottom"><div><b>{money(product.price, en)}</b>{product.oldPrice ? <del>{money(product.oldPrice, en)}</del> : null}</div>{quantity ? <div className="fresh-qty"><button onClick={onRemove}><Minus size={13} /></button><b>{quantity}</b><button onClick={onAdd}><Plus size={13} /></button></div> : <button className="add-cart" onClick={onAdd}>{en ? "Add to Cart" : "أضف للسلة"}</button>}</div></article>; }
function CartPanel({ en, items, cart, total, add, remove, open, checkout }: { en: boolean; items: Product[]; cart: Record<number, number>; total: number; add: (id: number) => void; remove: (id: number) => void; open: () => void; checkout: () => void }) { return <div className="cart-panel"><div className="cart-panel-title"><h2>{en ? "Your Cart" : "سلتك"} ({items.reduce((s, p) => s + cart[p.id], 0)})</h2><button onClick={open}>{en ? "View Cart" : "عرض السلة"}</button></div>{items.length ? items.slice(0, 2).map(p => <div className="cart-line" key={p.id}><img src={productIcon(p)} alt={en ? p.nameEn : p.name} /><div><b>{en ? p.nameEn : p.name}</b><small>{en ? p.unitEn : p.unit}</small><strong>{money(p.price, en)}</strong></div><div className="fresh-qty"><button onClick={() => remove(p.id)}><Minus size={12} /></button><b>{cart[p.id]}</b><button onClick={() => add(p.id)}><Plus size={12} /></button></div><button className="cart-remove" aria-label={en ? "Remove item" : "حذف المنتج"} onClick={() => remove(p.id)}><Trash2 size={17} /></button></div>) : <div className="cart-empty"><ShoppingBag size={26} /><p>{en ? "Your cart is empty" : "السلة فارغة"}</p></div>}<div className="cart-subtotal"><b>{en ? "Subtotal" : "الإجمالي"}</b><strong>{money(total, en)}</strong></div><button className="checkout-main" onClick={checkout} disabled={!items.length}>{en ? "Checkout" : "إتمام الطلب"} <ArrowRight size={18} /></button></div>; }
function CartDrawer({ en, items, cart, total, add, remove, close, checkout }: { en: boolean; items: Product[]; cart: Record<number, number>; total: number; add: (id: number) => void; remove: (id: number) => void; close: () => void; checkout: () => void }) { return <div className="fresh-drawer-backdrop" onClick={close}><aside className="fresh-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>{en ? "Your Cart" : "سلتك"}</h2><button onClick={close} aria-label={en ? "Close cart" : "إغلاق السلة"}><X /></button></div>{items.length ? items.map(p => <div className="cart-line drawer-line" key={p.id}><img src={productIcon(p)} alt="" /><div><b>{en ? p.nameEn : p.name}</b><small>{en ? p.unitEn : p.unit}</small><strong>{money(p.price * cart[p.id], en)}</strong></div><div className="fresh-qty"><button onClick={() => remove(p.id)}><Minus size={12} /></button><b>{cart[p.id]}</b><button onClick={() => add(p.id)}><Plus size={12} /></button></div></div>) : <div className="cart-empty"><ShoppingBag size={28} /><p>{en ? "Your cart is empty" : "السلة فارغة"}</p></div>}<div className="cart-subtotal"><b>{en ? "Subtotal" : "الإجمالي"}</b><strong>{money(total, en)}</strong></div><button className="checkout-main" onClick={checkout} disabled={!items.length}>{en ? "Checkout" : "إتمام الطلب"} <ArrowRight size={18} /></button></aside></div>; }

function FavoritesDrawer({ en, items, add, close }: { en: boolean; items: Product[]; add: (id: number) => void; close: () => void }) { return <div className="fresh-drawer-backdrop" onClick={close}><aside className="fresh-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>{en ? "Favorites" : "المفضلة"}</h2><button onClick={close} aria-label={en ? "Close favorites" : "إغلاق المفضلة"}><X /></button></div>{items.length ? items.map(p => <div className="favorite-line" key={p.id}><img src={productIcon(p)} alt="" /><div><b>{en ? p.nameEn : p.name}</b><small>{money(p.price, en)}</small></div><button className="add-cart" onClick={() => add(p.id)}>{en ? "Add" : "أضف"}</button></div>) : <div className="cart-empty"><Heart size={30} /><p>{en ? "Save products you love here." : "احفظ المنتجات المفضلة هنا."}</p></div>}</aside></div>; }
function LocationModal({ en, address, setAddress, close }: { en: boolean; address: string; setAddress: (v: string) => void; close: () => void }) { const [draft, setDraft] = useState(address); const valid = draft.trim().length >= 3; return <div className="modal-backdrop" onClick={close}><div className="modal-card" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>{en ? "Delivery location" : "موقع التوصيل"}</h2><button onClick={close} aria-label={en ? "Close location" : "إغلاق الموقع"}><X /></button></div><label>{en ? "Address" : "العنوان"}<input value={draft} onChange={e => setDraft(e.target.value)} aria-invalid={!valid} /></label>{!valid && <small className="input-error">{en ? "Enter at least 3 characters." : "اكتب عنوانًا من 3 أحرف على الأقل."}</small>}<button className="checkout-main" disabled={!valid} onClick={() => { setAddress(draft.trim()); close(); }}>{en ? "Save location" : "حفظ الموقع"}</button></div></div>; }
function CheckoutModal({ en, items, total, close }: { en: boolean; items: Product[]; total: number; close: () => void }) { const [done, setDone] = useState(false); return <div className="modal-backdrop" onClick={close}><div className="modal-card" onClick={e => e.stopPropagation()}>{done ? <div className="success-state"><CheckCircle2 size={46} /><h2>{en ? "Order received" : "تم استلام طلبك"}</h2><p>{en ? "We will contact you to confirm delivery." : "سنتواصل معك لتأكيد التوصيل."}</p><button className="checkout-main" onClick={close}>{en ? "Done" : "تم"}</button></div> : <><div className="drawer-head"><h2>{en ? "Checkout" : "إتمام الطلب"}</h2><button onClick={close}><X /></button></div><p>{en ? items.length + " products ready for delivery." : items.length + " منتجات جاهزة للتوصيل."}</p><div className="checkout-summary"><span>{en ? "Total" : "الإجمالي"}</span><b>{money(total, en)}</b></div><button className="checkout-main" onClick={() => setDone(true)}>{en ? "Place order" : "تأكيد الطلب"} <ArrowRight size={18} /></button></>}</div></div>; }
