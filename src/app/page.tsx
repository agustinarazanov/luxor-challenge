import React from "react";
import Collections from "./(components)/collections";
import { getServerSession } from "next-auth";
import authOptions from "../../auth";
import Link from "next/link";
import { getCollections } from "./actions";

export default async function BidPage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return null;

    const { userCollections, otherCollections } = await getCollections(userId);

    return (
        <main className="mt-4 space-y-6 min-h-screen max-w-7xl mx-auto p-8">
            <header className="flex justify-between items-center rounded">
                <h1 className="text-3xl">My collections</h1>
                <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                    <Link href="/collections">Create</Link>
                </button>
            </header>
            <Collections collections={userCollections} currentUser={userId} />
            <h1 className="text-3xl pt-10">Bidding collections</h1>
            <Collections collections={otherCollections} currentUser={userId} />
        </main>
    );
}
