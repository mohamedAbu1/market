import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const items = Array.isArray(body.items) ? body.items : [];
    if (!name || !phone || !address || !items.length) return NextResponse.json({ error: "invalid_order" }, { status: 400 });
    const requestedItems: Array<{ productId: number; quantity: number }> = items.map((item: { productId: number; quantity: number }) => ({ productId: Number(item.productId), quantity: Number(item.quantity) }));
    if (requestedItems.some(item => !Number.isInteger(item.productId) || !Number.isInteger(item.quantity) || item.quantity < 1)) return NextResponse.json({ error: "invalid_items" }, { status: 400 });
    const products = await prisma.product.findMany({ where: { id: { in: requestedItems.map(item => item.productId) } }, select: { id: true, price: true, stock: true } });
    if (products.length !== requestedItems.length || products.some(product => { const requested = requestedItems.find(item => item.productId === product.id)!; return requested.quantity > product.stock; })) return NextResponse.json({ error: "items_unavailable" }, { status: 409 });
    const total = requestedItems.reduce((sum, item) => sum + Number(products.find(product => product.id === item.productId)!.price) * item.quantity, 0);
    const paymentMethod = body.paymentMethod === "CARD" || body.paymentMethod === "WALLET" ? body.paymentMethod : "CASH_ON_DELIVERY";
    const customer = await prisma.customer.upsert({ where: { phone }, update: { name, address }, create: { name, phone, address } });
    const order = await prisma.$transaction(async transaction => {
      for (const item of requestedItems) {
        const updated = await transaction.product.updateMany({ where: { id: item.productId, stock: { gte: item.quantity } }, data: { stock: { decrement: item.quantity } } });
        if (updated.count !== 1) throw new Error("stock_changed");
      }
      return transaction.order.create({ data: { customerId: customer.id, address, deliveryType: body.deliveryType === "SCHEDULED" ? "SCHEDULED" : "EXPRESS", paymentMethod, total, items: { create: requestedItems.map(item => ({ productId: item.productId, quantity: item.quantity, unitPrice: Number(products.find(product => product.id === item.productId)!.price) })) } } });
    });
    return NextResponse.json({ id: order.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "order_unavailable" }, { status: 503 });
  }
}
