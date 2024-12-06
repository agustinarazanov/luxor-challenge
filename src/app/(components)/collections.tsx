import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import type { CollectionSelect } from "@/types";
import Link from "next/link";
import BidsContainer from "./bids";

export default function Collections({ collections, currentUser }: { collections: CollectionSelect[]; currentUser: string }) {
    return (
        <div className="space-y-4">
            {collections.map(({ id, name, description, price, userId }) => {
                const owner = userId === currentUser;
                return (
                    <Disclosure as="div" key={id} className="space-y-4">
                        <div className="flex justify-between items-center border-gray-400 border p-4 rounded">
                            <DisclosureButton className="flex flex-grow gap-3 items-center" aria-expanded="false">
                                <span className="text-lg font-semibold">{name}</span>
                                <span className="text-lg font-extralight">${price}</span>
                                <span className="text-sm font-light text-neutral-500">{description}</span>
                            </DisclosureButton>
                            {owner ? (
                                <div className="space-x-2">
                                    <Link href={`/collections/${id}/update`} className="border-yellow-500 border text-yellow-500 px-3 py-1 rounded">
                                        Edit
                                    </Link>
                                    <Link href={`/collections/${id}/delete`} className="border-red-500 border text-red-500 px-3 py-1 rounded">
                                        Delete
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Link href={`/collections/${id}/bids`} className="border-yellow-500 border text-yellow-500 px-3 py-1 rounded">
                                        Place bid
                                    </Link>
                                </div>
                            )}
                        </div>
                        <DisclosurePanel className="pl-20 space-y-3">
                            <BidsContainer collectionId={id} collectionOwner={owner} currentUser={currentUser} />
                        </DisclosurePanel>
                    </Disclosure>
                );
            })}
        </div>
    );
}
