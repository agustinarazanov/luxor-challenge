"use client";

import { BidInsert } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditBid() {
    const { register, handleSubmit, reset } = useForm<BidInsert>();
    const { collection_id, bid_id } = useParams<{ collection_id: string; bid_id: string }>();

    useEffect(() => {
        fetch(`/api/collections/${collection_id}/bids/${bid_id}`).then((res) => {
            if (res.ok) res.json().then((data) => reset(data));
        });
    }, [collection_id, bid_id, reset]);

    const router = useRouter();

    const onSubmit: SubmitHandler<BidInsert> = async (data) => {
        const res = await fetch(`/api/collections/${collection_id}/bids/${bid_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data }),
        });
        if (res.ok) {
            toast.success("Bid updated");
        } else {
            toast.error("Failed to update bid");
        }
        router.back();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 px-4 pb-4">
            <div className="flex flex-col text-sm">
                <label>Price</label>
                <input className="border border-gray-300 rounded" type="number" {...register("price")} />
            </div>
            <div className="flex flex-row-reverse gap-2">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-green-500 px-3 py-2 text-sm font-semibold text-green-500 shadow-sm w-auto"
                >
                    Save
                </button>
                <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                        router.back();
                    }}
                    className="inline-flex justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semiboldshadow-sm w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
