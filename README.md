# ملك ماركت — Supermarket Commerce MVP

واجهة متجر سوبرماركت عربية RTL مبنية بـ Next.js وReact وTailwind CSS، بهوية ملك ماركت وصور منتجات حقيقية من Unsplash، مع مخطط Prisma جاهز لـ MySQL المحلي.

## التشغيل

```bash
npm install
copy .env.example .env
# عدّل DATABASE_URL ثم أنشئ قاعدة بيانات malek_market في MySQL
npx prisma db push
npm run db:seed
npm run dev
```

افتح `http://localhost:3000`.

## ما تم تنفيذه

- تصميم responsive عربي RTL بهوية خضراء احترافية.
- هيدر ثابت، بحث، فئات، عروض، بطاقات منتجات، تقييمات، وCTA واضح.
- سلة شراء جانبية مع تعديل الكميات والإجمالي.
- اختيار الموقع ونوع التوصيل: سريع خلال 120 دقيقة أو مجدول.
- زر واتساب ثابت، فوتر متعدد الأعمدة، وبيانات SEO أساسية.
- قاعدة MySQL محلية متصلة عبر Prisma، مع API للمنتجات وبيانات أولية تشمل 25 فئة و43 منتجاً.
- ثيم فاتح/داكن، دعم عربي/إنجليزي، ودعم محمي للوحة التحكم عبر Middleware.

## الخطوة التالية للإنتاج

لبيئة الإنتاج: تفعيل Google OAuth بالمفاتيح الحقيقية، إضافة الدفع، تخزين الصور على CDN، وربط الطلبات والعملاء الفعلية بلوحة الإدارة.

## Google Login

أضف قيم `GOOGLE_CLIENT_ID` و`GOOGLE_CLIENT_SECRET` و`NEXTAUTH_SECRET` إلى `.env`. في Google Cloud Console أضف redirect URI التالي:

`http://localhost:3000/api/auth/callback/google`

ثم اجعل `NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED="true"` وأعد تشغيل Next.js.
