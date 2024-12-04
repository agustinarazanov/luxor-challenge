import drizzle from "@/db/schema";
import { collection } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    const result = await drizzle
        .select()
        .from(collection)
        .where(userId ? eq(collection.userId, userId) : undefined)
        .orderBy(collection.id);

    return result.length > 0 ? NextResponse.json(result) : new NextResponse(null, { status: 404 });
}

export async function POST(request: NextRequest) {
    await drizzle.insert(collection).values(await request.json());
    return new NextResponse(null, { status: 201 });
}
