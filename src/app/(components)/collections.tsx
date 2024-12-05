"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import type { CollectionSelect } from "@/types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Bids from "./bids";
import Loading from "../loading";

function Collections({ collections, owner }: { collections: CollectionSelect[]; owner: boolean }) {
    return (
        <div className="space-y-4">
            {owner ? (
                <header className="flex justify-between items-center rounded">
                    <h1 className="text-3xl">My collections</h1>
                    <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                        <Link href="/collections">Create</Link>
                    </button>
                </header>
            ) : (
                <h1 className="text-3xl">Bidding collections</h1>
            )}

            {collections.map(({ id, name, description, price }) => {
                return (
                    <Disclosure as="div" key={id} className="space-y-4">
                        <div className="flex justify-between items-center border-gray-400 border p-4 rounded">
                            <DisclosureButton className="flex flex-grow gap-3 items-center" aria-expanded="false">
                                <span className="text-lg font-semibold">{name}</span>
                                <span className="text-lg font-extralight">${price}</span>
                                <span className="text-sm font-light text-neutral-500">{description}</span>
                            </DisclosureButton>
                            <div className="space-x-2">
                                {owner ? (
                                    <>
                                        <Link
                                            href={`/collections/${id}/update`}
                                            className="border-yellow-500 border text-yellow-500 px-3 py-1 rounded"
                                        >
                                            Edit
                                        </Link>
                                        <Link href={`/collections/${id}/delete`} className="border-red-500 border text-red-500 px-3 py-1 rounded">
                                            Delete
                                        </Link>
                                    </>
                                ) : (
                                    <Link href={`/collections/${id}/bids`} className="border-yellow-500 border text-yellow-500 px-3 py-1 rounded">
                                        Place bid
                                    </Link>
                                )}
                            </div>
                        </div>
                        <DisclosurePanel className="pl-20 space-y-3">
                            <Bids collectionId={id} owner={owner} />
                        </DisclosurePanel>
                    </Disclosure>
                );
            })}
        </div>
    );
}

export default function Listing() {
    const { data: session } = useSession();
    const [collections, setCollections] = useState<{ userCollections: CollectionSelect[]; otherCollections: CollectionSelect[] } | undefined>();

    useEffect(() => {
        const userId = session?.user.id;
        fetch("/api/collections" + (userId ? `?userId=${userId}` : ""))
            .then((res) => (res.ok ? res.json() : []))
            .then(setCollections)
            .catch(console.error);
    }, [session?.user.id]);

    if (!collections) return <Loading />;

    return (
        <div className="space-y-20">
            <Collections collections={collections.userCollections} owner={true} />
            <Collections collections={collections.otherCollections} owner={false} />
        </div>
    );
}
