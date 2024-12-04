"use client";

import Modal from "@/app/(components)/modal";
import Form from "./form";

export default function Page() {
    return (
        <Modal title="Delete collection" description="Are you sure you want to delete this collection? This action cannot be undone.">
            <Form />
        </Modal>
    );
}
