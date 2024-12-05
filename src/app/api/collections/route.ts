import drizzle from "@/db/schema";
import { collection } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, ne } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    const [userCollections, otherCollections] = await Promise.all([
        drizzle
            .select()
            .from(collection)
            .where(userId ? eq(collection.userId, userId) : undefined)
            .orderBy(collection.id),
        drizzle
            .select()
            .from(collection)
            .where(userId ? ne(collection.userId, userId) : undefined)
            .orderBy(collection.id),
    ]);

    return NextResponse.json({ userCollections, otherCollections });
}

export async function POST(request: NextRequest) {
    await drizzle.insert(collection).values(await request.json());
    return new NextResponse(null, { status: 201 });
}
