import { eq } from "drizzle-orm";
import drizzle from "@/db/schema";
import { collection } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ collection_id: number }> };

export async function GET(request: NextRequest, { params }: Params) {
    const { collection_id } = await params;
    const result = await drizzle.select().from(collection).where(eq(collection.id, collection_id));
    return result.length > 0 ? NextResponse.json(result[0]) : new NextResponse(null, { status: 404 });
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { name, description, stocks, price } = await request.json();
    const { collection_id } = await params;
    await drizzle.update(collection).set({ name, description, stocks, price }).where(eq(collection.id, collection_id));
    return new NextResponse(null, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const { collection_id } = await params;
    await drizzle.delete(collection).where(eq(collection.id, collection_id));
    return new NextResponse(null, { status: 204 });
}
