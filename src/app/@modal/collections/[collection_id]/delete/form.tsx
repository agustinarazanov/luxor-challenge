"use client";

import { deleteCollection } from "@/app/actions";
import { CollectionInsert } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function DeleteCollection() {
    const { handleSubmit } = useForm<CollectionInsert>();
    const { collection_id } = useParams<{ collection_id: string }>();
    const router = useRouter();

    const onSubmit: SubmitHandler<CollectionInsert> = async () => {
        const ok = await deleteCollection(collection_id);
        if (ok) toast.success("Collection removed");
        else toast.error("Failed to remove collection");
        router.back();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 px-4 pb-4">
            <div className="flex flex-row-reverse gap-2">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-red-500 px-3 py-2 text-sm font-semibold text-red-500 shadow-sm w-auto"
                >
                    Delete
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
