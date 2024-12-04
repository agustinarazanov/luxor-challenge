"use client";

import Modal from "@/app/(components)/modal";
import Form from "./form";

export default function Page() {
    return (
        <Modal title="Cancel bid" description="Are you sure you want to cancel this bid? This action cannot be undone.">
            <Form />
        </Modal>
    );
}
