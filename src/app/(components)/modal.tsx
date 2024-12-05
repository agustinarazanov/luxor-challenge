"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";

export default function Modal({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center text-center sm:items-center">
                    <DialogPanel
                        transition
                        className="relative bg-background space-y-4 transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="items-start px-4 pt-4 text-left">
                            <DialogTitle as="h3" className="text-base font-semibold">
                                {title}
                            </DialogTitle>
                            <p className="text-sm">{description}</p>
                        </div>
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
