import drizzle from "@/db/schema";
import { collection } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, ne } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
        const collections = await drizzle.select().from(collection).orderBy(collection.id);
        return collections ? NextResponse.json({ collections }) : new NextResponse(null, { status: 404 });
    }

    const [userCollections, otherCollections] = await Promise.all([
        drizzle.select().from(collection).where(eq(collection.userId, userId)).orderBy(collection.id),
        drizzle.select().from(collection).where(ne(collection.userId, userId)).orderBy(collection.id),
    ]);

    return NextResponse.json({ userCollections, otherCollections });
}

export async function POST(request: NextRequest) {
    await drizzle.insert(collection).values(await request.json());
    return new NextResponse(null, { status: 201 });
}
