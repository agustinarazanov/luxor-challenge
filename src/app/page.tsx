import React from "react";
import Listing from "./(components)/collections";

export default async function BidPage() {
    return (
        <div className="min-h-screen max-w-7xl mx-auto p-8">
            <main className="mt-4 space-y-6">
                <Listing />
            </main>
        </div>
    );
}
