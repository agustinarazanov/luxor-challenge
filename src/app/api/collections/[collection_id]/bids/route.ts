import drizzle, { bid } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ collection_id: number }> };

export async function GET(request: NextRequest, { params }: Params) {
    const { collection_id } = await params;
    const result = await drizzle.select().from(bid).where(eq(bid.collectionId, collection_id)).orderBy(bid.id);
    return result.length > 0 ? NextResponse.json(result) : new NextResponse(null, { status: 404 });
}

export async function POST(request: NextRequest, { params }: Params) {
    const body = await request.json();
    const { collection_id } = await params;
    if (body.collection_id && body.collection_id !== collection_id) return new Response(null, { status: 400 });
    await drizzle.insert(bid).values({ ...body, collectionId: collection_id });
    return new NextResponse(null, { status: 201 });
}
