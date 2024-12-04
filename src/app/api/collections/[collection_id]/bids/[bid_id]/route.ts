import { eq, and } from "drizzle-orm";
import drizzle, { bid } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ collection_id: number; bid_id: number }> };

export async function GET(request: NextRequest, { params }: Params) {
    const { collection_id, bid_id } = await params;

    const result = await drizzle
        .select()
        .from(bid)
        .where(and(eq(bid.id, bid_id), eq(bid.collectionId, collection_id)));

    return result.length > 0 ? NextResponse.json(result[0]) : new NextResponse(null, { status: 404 });
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const { status, price } = await request.json();
    const { collection_id, bid_id } = await params;

    if (status === "accepted") {
        await drizzle.update(bid).set({ status: "rejected" }).where(eq(bid.collectionId, collection_id));
    }

    await drizzle
        .update(bid)
        .set({ status, price })
        .where(and(eq(bid.id, bid_id), eq(bid.collectionId, collection_id)));

    return new NextResponse(null, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const { collection_id, bid_id } = await params;
    await drizzle.delete(bid).where(and(eq(bid.id, bid_id), eq(bid.collectionId, collection_id)));
    return new NextResponse(null, { status: 204 });
}
