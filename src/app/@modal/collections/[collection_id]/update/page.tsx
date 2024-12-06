import Modal from "@/app/(components)/modal";
import EditCollection from "./form";
import { getCollection } from "@/app/actions";

export default async function Page({ params }: { params: Promise<{ collection_id: string }> }) {
    const { collection_id } = await params;
    const collection = await getCollection(collection_id);

    return (
        <Modal
            title="Edit an existing collection"
            description="Fill the form to update one of your collections and click on the Save button to submit."
        >
            <EditCollection collection={collection} />
        </Modal>
    );
}
