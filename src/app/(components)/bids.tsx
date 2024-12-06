"use client";

import type { BidSelect, BidStatus } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import { updateBid } from "../actions";

async function updateBidStatus(collectionId: number, bidId: number, status: BidStatus) {
    try {
        const ok = await updateBid({ status }, collectionId, bidId);
        if (ok) toast.success(`Bid ${status}`);
        else toast.error("Failed to update bid status");
    } catch (error) {
        toast.error("Failed to update bid status");
        console.error(error);
    }
}

async function fetcher(...args: [RequestInfo, RequestInit?]) {
    return fetch(...args).then((res) => (res.ok ? res.json() : []));
}

export default function Bids({
    collectionId,
    collectionOwner,
    currentUser,
}: {
    collectionId: number;
    collectionOwner: boolean;
    currentUser: string;
}) {
    const { data: bids, error, isLoading } = useSWR<BidSelect[]>(`/api/collections/${collectionId}/bids`, fetcher);

    if (isLoading) return <div>Loading...</div>;

    if (error || !bids) return <div>Failed to load</div>;

    if (!bids.length) {
        return (
            <div className="border-gray-400 border flex justify-between items-center p-4 rounded">
                <span>No bids to show</span>
            </div>
        );
    }

    return bids.map((bidItem) => (
        <div key={bidItem.id} className="border-gray-400 border flex justify-between items-center p-4 rounded">
            <div className="flex items-center gap-3">
                <span>${bidItem.price}</span>
                <span className="text-sm font-light text-neutral-500">{bidItem.status}</span>
            </div>
            <div className="space-x-2">
                {bidItem.userId === currentUser && (
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
                {collectionOwner && (
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
    ));
}
