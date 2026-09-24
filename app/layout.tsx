import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ملك ماركت | كل الخير في طريقه ليك",
  description: "ملك ماركت — سوبرماركت مصري أونلاين بمنتجات أصلية وتوصيل سريع ومجدول.",
  openGraph: { title: "ملك ماركت | سوبرماركت أونلاين", description: "منتجات أصلية وطازة لحد باب البيت" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}
