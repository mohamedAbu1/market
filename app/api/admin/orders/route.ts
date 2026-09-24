import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const statusLabels: Record<string, [string, string, string]> = {
  PENDING: ["قيد المراجعة", "Under review", "bg-gray-100 text-gray-600"],
  CONFIRMED: ["تم التأكيد", "Confirmed", "bg-blue-50 text-blue-700"],
  PREPARING: ["جاري التجهيز", "Preparing", "bg-amber-50 text-amber-700"],
  OUT_FOR_DELIVERY: ["في الطريق", "On the way", "bg-blue-50 text-blue-700"],
  DELIVERED: ["تم التوصيل", "Delivered", "bg-emerald-50 text-emerald-700"],
  CANCELLED: ["ملغي", "Cancelled", "bg-red-50 text-red-700"],
};

export async function GET() {
  try {
    if (!await getServerSession(authOptions)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const rows = await prisma.order.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 10 });
    return NextResponse.json(rows.map(row => { const [status, statusEn, tone] = statusLabels[row.status] ?? statusLabels.PENDING; return { id: `#MK-${String(row.id).padStart(4, "0")}`, customer: row.customer?.name ?? "—", customerEn: row.customer?.name ?? "—", status, statusEn, total: `${Number(row.total).toFixed(2)} ج.م`, tone }; }));
  } catch {
    return NextResponse.json({ error: "orders_unavailable" }, { status: 503 });
  }
}
