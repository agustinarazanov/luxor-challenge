"use client";

import { BidInsert } from "@/types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateBid() {
    const { register, handleSubmit } = useForm<BidInsert>();
    const router = useRouter();
    const { collection_id } = useParams();
    const { data: session } = useSession();

    const onSubmit: SubmitHandler<BidInsert> = async (data) => {
        const res = await fetch(`/api/collections/${collection_id}/bids`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, userId: session?.user.id }),
        });
        if (res.ok) {
            toast.success("Bid submitted");
        } else {
            toast.error("Failed to submit bid");
        }
        router.back();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 px-4 pb-4">
            <div className="flex flex-col text-sm">
                <label>Price</label>
                <input className="bg-neutral-900 border border-gray-300 rounded" type="number" {...register("price")} />
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
