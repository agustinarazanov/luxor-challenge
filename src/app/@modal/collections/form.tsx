"use client";

import { collection } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateCollection() {
    const { register, handleSubmit } = useForm<typeof collection.$inferInsert>();
    const router = useRouter();
    const { data: session } = useSession();

    const onSubmit: SubmitHandler<typeof collection.$inferInsert> = async (data) => {
        const res = await fetch("/api/collections", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, userId: session?.user.id }),
        });
        if (res.ok) {
            toast.success("Collection created");
        } else {
            toast.error("Failed to create collection");
        }
        router.back();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 px-4 pb-4">
            {[
                { name: "name", type: "text" },
                { name: "description", type: "text" },
                { name: "stocks", type: "number" },
                { name: "price", type: "number" },
            ].map(({ name, type }, index) => (
                <div key={index} className="flex flex-col text-sm">
                    <label>{name[0].toUpperCase() + name.slice(1)}</label>
                    <input
                        className="bg-neutral-900 border border-gray-300 rounded"
                        type={type}
                        {...register(name as keyof typeof collection.$inferInsert)}
                    />
                </div>
            ))}
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
