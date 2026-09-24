import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    if (!await getServerSession(authOptions)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const [orders, customers, products, sales] = await Promise.all([
      prisma.order.count(),
      prisma.customer.count(),
      prisma.product.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
    ]);
    return NextResponse.json({ orders, customers, products, sales: Number(sales._sum.total ?? 0).toFixed(2) });
  } catch {
    return NextResponse.json({ error: "overview_unavailable" }, { status: 503 });
  }
}
