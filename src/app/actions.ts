"use server";

import { BidInsert, BidSelect, CollectionInsert, CollectionSelect } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function fetchWithAuth(url: string, options?: RequestInit) {
    const cookieStore = await cookies();
    return fetch(`${process.env.NEXTAUTH_URL}${url}`, { ...options, headers: { ...options?.headers, Cookie: cookieStore.toString() } });
}

type Collections = { userCollections: CollectionSelect[]; otherCollections: CollectionSelect[] };

export async function getCollections(userId?: string): Promise<Collections> {
    const res = await fetchWithAuth(`/api/collections?userId=${userId}`);
    return res.json();
}

export async function getCollection(collection_id: string): Promise<CollectionSelect | undefined> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}`);
    return res.ok ? res.json() : undefined;
}

export async function createCollection(data: CollectionInsert, userId?: string): Promise<boolean> {
    const res = await fetchWithAuth("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
    });
    revalidatePath("/");
    return res.ok;
}

export async function updateCollection(data: CollectionInsert, collection_id: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
    });
    revalidatePath("/");
    return res.ok;
}

export async function deleteCollection(collection_id: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}`, { method: "DELETE" });
    revalidatePath("/");
    return res.ok;
}

export async function getBid(collection_id: string, bid_id: string): Promise<BidSelect | undefined> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}/bids/${bid_id}`);
    return res.ok ? res.json() : undefined;
}

export async function createBid(data: BidInsert, collection_id?: string | string[], userId?: string): Promise<boolean> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
    });
    revalidatePath("/");
    return res.ok;
}

export async function updateBid(
    data: Partial<BidInsert>,
    collection_id?: string | string[] | number,
    bid_id?: string | string[] | number
): Promise<boolean> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}/bids/${bid_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
    });
    revalidatePath("/");
    return res.ok;
}

export async function deleteBid(collection_id?: string | string[], bid_id?: string | string[]): Promise<boolean> {
    const res = await fetchWithAuth(`/api/collections/${collection_id}/bids/${bid_id}`, { method: "DELETE" });
    revalidatePath("/");
    return res.ok;
}
