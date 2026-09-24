import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/data";
import { productImage } from "@/lib/product-images";

export async function GET() {
  try {
    const rows = await prisma.product.findMany({ include: { category: true }, orderBy: { id: "asc" }, take: 100 });
    const categoryLabels: Record<string, string> = {
      "البقالة والمواد الغذائية": "بقالة", "الأرز والمكرونة والحبوب": "بقالة", "المعلبات": "بقالة",
      "الزيوت والسمن": "بقالة", "السكر والعسل والمربى": "بقالة", "القهوة والشاي": "بقالة",
      "المشروبات": "مشروبات", "الأطعمة المجمدة": "مجمدات", "السناكس والحلويات": "سناكس وحلويات",
      "العناية بالمنزل": "عناية بالمنزل", "العناية الشخصية": "عناية شخصية", "اللحوم والدواجن": "لحوم ودواجن",
      "الألبان والأجبان والبيض": "ألبان وأجبان", "الخضار والفاكهة": "خضار وفاكهة", "منتجات الأطفال": "منتجات الأطفال",
      "أغذية الحيوانات": "أغذية الحيوانات", "العطارة والأعشاب": "عطارة وأعشاب"
    };
    const normalizeCategory = (name: string, slug: string) => {
      if (categoryLabels[name]) return categoryLabels[name];
      const value = `${name} ${slug}`.toLocaleLowerCase("ar-EG");
      if (/مشروب|beverage/.test(value)) return "مشروبات";
      if (/مجمد|frozen/.test(value)) return "مجمدات";
      if (/سناك|حلويات|snack|sweet/.test(value)) return "سناكس وحلويات";
      if (/منزل|home|clean/.test(value)) return "عناية بالمنزل";
      if (/شخص|personal|beauty/.test(value)) return "عناية شخصية";
      if (/طفل|baby/.test(value)) return "منتجات الأطفال";
      if (/حيوان|pet/.test(value)) return "أغذية الحيوانات";
      if (/عطار|عشب|herb|spice/.test(value)) return "عطارة وأعشاب";
      if (/لحم|دجاج|دواجن|meat|poultry/.test(value)) return "لحوم ودواجن";
      if (/لبن|ألبان|جبن|بيض|dairy|egg/.test(value)) return "ألبان وأجبان";
      if (/فاكه|خضار|fruit|vegetable/.test(value)) return "خضار وفاكهة";
      return "بقالة";
    };
    const result = rows.map((row, index) => {
      const fallback = fallbackProducts[index % fallbackProducts.length];
      return { id: row.id, name: row.nameAr, nameEn: row.nameEn, brand: row.brandAr ?? row.brandEn ?? "Malek Market", brandEn: row.brandEn ?? row.brandAr ?? "Malek Market", category: normalizeCategory(row.category.nameAr, row.category.slug), categorySlug: row.category.slug, price: Number(row.price), oldPrice: row.oldPrice ? Number(row.oldPrice) : undefined, unit: row.unit, image: productImage(row.nameEn, row.category.slug), color: fallback.color, rating: 4.5, badge: row.oldPrice ? "عرض" : undefined };
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    // Keep the storefront usable when the local database is unavailable.
    // The client can still render a coherent catalog and the header tells us
    // this is a degraded response instead of pretending that the catalog is empty.
    return NextResponse.json(fallbackProducts, {
      headers: { "Cache-Control": "no-store", "X-Catalog-Source": "fallback" },
    });
  }
}

