"use client";

import { createBid } from "@/app/actions";
import { BidInsert } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateBid({ userId }: { userId?: string }) {
    const { register, handleSubmit } = useForm<BidInsert>();
    const router = useRouter();
    const { collection_id } = useParams();

    const onSubmit: SubmitHandler<BidInsert> = async (data) => {
        const ok = await createBid(data, collection_id, userId);
        if (ok) toast.success("Bid submitted");
        else toast.error("Failed to submit bid");
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
                    onClick={() => router.back()}
                    className="inline-flex justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semiboldshadow-sm w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
