import Modal from "@/app/(components)/modal";
import EditBid from "./form";
import { getBid } from "@/app/actions";

export default async function Page({ params }: { params: Promise<{ collection_id: string; bid_id: string }> }) {
    const { collection_id, bid_id } = await params;
    const bid = await getBid(collection_id, bid_id);

    return (
        <Modal
            title="Edit an existing collection"
            description="Fill the form to update one of your collections and click on the Save button to submit."
        >
            <EditBid bid={bid} />
        </Modal>
    );
}
