"use client";

import { memo, useEffect, useState } from "react";
import type { BidSelect } from "@/types";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import Link from "next/link";
import toast from "react-hot-toast";

const fetchBids = async (collectionId: number) => {
    try {
        const response = await fetch(`/api/collections/${collectionId}/bids`);
        if (response.ok) return await response.json();
        else return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const updateBidStatus = async (collectionId: number, bidId: number, status: string) => {
    try {
        const res = await fetch(`/api/collections/${collectionId}/bids/${bidId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (res.ok) {
            toast.success(`BidSelect ${status}`);
        }
    } catch (error) {
        console.error(error);
    }
};

const Bids = memo(({ collectionId, owner }: { collectionId: number; owner: boolean }) => {
    const [bids, setBids] = useState<BidSelect[] | undefined>();
    const { data: session } = useSession();

    useEffect(() => {
        fetchBids(collectionId).then(setBids);
    }, [collectionId]);

    if (!bids) return <Loading />;

    return bids.length > 0 ? (
        bids.map((bidItem) => (
            <div key={bidItem.id} className="border-gray-400 border flex justify-between items-center p-4 rounded">
                <div className="flex items-center gap-3">
                    <span>${bidItem.price}</span>
                    <span className="text-sm font-light text-neutral-500">{bidItem.status}</span>
                </div>
                <div className="space-x-2">
                    {bidItem.userId === session?.user.id && (
                        <>
                            <Link
                                href={`/collections/${collectionId}/bids/${bidItem.id}/update`}
                                className="border-yellow-500 border text-yellow-500 px-3 py-1 rounded"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/collections/${collectionId}/bids/${bidItem.id}/delete`}
                                className="border-red-500 border text-red-500 px-3 py-1 rounded"
                            >
                                Cancel
                            </Link>
                        </>
                    )}
                    {owner && (
                        <>
                            <button
                                onClick={() => updateBidStatus(collectionId, bidItem.id, "accepted")}
                                className="border-green-500 border px-3 text-green-500 rounded"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => updateBidStatus(collectionId, bidItem.id, "rejected")}
                                className="border-red-500 border text-red-500 px-3 rounded"
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
            </div>
        ))
    ) : (
        <div className="border-gray-400 border flex justify-between items-center p-4 rounded">
            <span>No bids to show</span>
        </div>
    );
});

Bids.displayName = "Bids";
export default Bids;
