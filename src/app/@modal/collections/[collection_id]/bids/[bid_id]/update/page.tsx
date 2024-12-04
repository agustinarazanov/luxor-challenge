import Modal from "@/app/(components)/modal";
import EditBid from "./form";

export default function Page() {
    return (
        <Modal title="Edit an existing collection" description="Fill the form to update one of your collections and click on the Save button to submit.">
            <EditBid />
        </Modal>
    );
}