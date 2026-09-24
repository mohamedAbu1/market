"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Slide = {
  image: string;
  kicker: string;
  title: string;
  body: string;
  label: string;
};

export default function HeroSlider({ en }: { en: boolean }) {
  const slides: Slide[] = [
    {
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=90",
      kicker: en ? "THE FRESH EDIT / 01" : "اختيارات طازة / ٠١",
      title: en ? "Fresh food, with a point of view." : "أكل طازة، باختيار له معنى.",
      body: en ? "A considered grocery collection for better everyday meals — picked with care and delivered to your door." : "تشكيلة بقالة مختارة بعناية لوجبات يومية أحسن، وتوصيل لحد بابك.",
      label: en ? "Farm-fresh arrivals" : "وصلت الطازة",
    },
    {
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=90",
      kicker: en ? "THE DAILY TABLE / 02" : "سفرة كل يوم / ٠٢",
      title: en ? "Make the everyday taste special." : "خلّي كل يوم على سفرتك مميز.",
      body: en ? "From pantry staples to the final garnish, find the ingredients that make home feel like home." : "من أساسيات المطبخ لآخر لمسة، هتلاقي كل اللي يخلي البيت أحلى.",
      label: en ? "Curated for your table" : "مختارة لسفرتك",
    },
    {
      image: "https://images.unsplash.com/photo-1601598851547-4302969d0c2b?auto=format&fit=crop&w=1400&q=90",
      kicker: en ? "WEEKLY DISCOVERY / 03" : "اكتشافات الأسبوع / ٠٣",
      title: en ? "Your good stuff is closer than ever." : "كل الحلو قريب منك أكتر من أي وقت.",
      body: en ? "Discover trusted brands, honest prices and a calmer way to shop everything your home needs." : "اكتشف براندات موثوقة، أسعار واضحة، وطريقة أهدى لتجيب كل احتياجات البيت.",
      label: en ? "A smarter weekly shop" : "تسوق أذكى كل أسبوع",
    },
  ];

  const [active, setActive] = useState(0);
  const current = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5600);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const move = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);

  return (
    <section className="overflow-hidden bg-cream py-7 text-ink sm:py-12">
      <div className="container">
        <div className="grid min-h-[570px] overflow-hidden bg-ink shadow-[0_24px_70px_rgba(24,41,61,.18)] lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative flex flex-col justify-between p-7 text-white sm:p-12 lg:p-16">
            <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
            <div className="relative">
              <p className="mb-9 text-xs font-black tracking-[.3em] text-amber-300">{current.kicker}</p>
              <h1 className="max-w-xl text-5xl font-black leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">{current.title}</h1>
              <p className="mt-7 max-w-lg text-base leading-8 text-emerald-50/70 sm:text-lg">{current.body}</p>
              <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="mt-9 inline-flex items-center gap-3 bg-amber-300 px-6 py-4 font-black text-[#142b25] transition hover:bg-amber-200">
                {en ? "Explore the collection" : "اكتشف التشكيلة"}
                <ArrowLeft size={18} />
              </button>
            </div>
            <div className="relative mt-12 flex gap-8 border-t border-white/15 pt-6 text-sm text-emerald-50/60">
              <span><b className="block text-2xl text-white">120</b>{en ? "min delivery" : "دقيقة توصيل"}</span>
              <span><b className="block text-2xl text-white">25+</b>{en ? "categories" : "قسم متنوع"}</span>
              <span><b className="block text-2xl text-white">4.8</b>{en ? "customer rating" : "تقييم العملاء"}</span>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden bg-black lg:min-h-0" style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}>
            <img key={current.image} src={current.image} alt={current.label} className="h-full min-h-[360px] w-full object-cover opacity-90 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-5 p-7 sm:p-10">
              <div>
                <p className="text-sm text-amber-200">{current.label}</p>
                <h2 className="mt-2 max-w-sm text-3xl font-black text-white sm:text-4xl">{en ? "Good food, made closer." : "الأكل الحلو بقى أقرب."}</h2>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => move(-1)} aria-label={en ? "Previous slide" : "الشريحة السابقة"} className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-ink"><ArrowRight size={18} /></button>
                <button onClick={() => move(1)} aria-label={en ? "Next slide" : "الشريحة التالية"} className="grid h-12 w-12 place-items-center rounded-full bg-citrus text-ink transition hover:bg-amber-200"><ArrowLeft size={18} /></button>
              </div>
            </div>
            <div className="absolute right-8 top-8 flex gap-2" role="tablist" aria-label={en ? "Hero slides" : "شرائح الهيرو"}>
              {slides.map((slide, index) => <button key={slide.kicker} onClick={() => setActive(index)} role="tab" aria-selected={active === index} aria-label={`${en ? "Slide" : "الشريحة"} ${index + 1}`} className={`h-1.5 transition-all ${active === index ? "w-10 bg-amber-300" : "w-5 bg-white/50"}`} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
