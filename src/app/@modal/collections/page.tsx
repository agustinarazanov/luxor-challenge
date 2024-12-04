import Modal from "@/app/(components)/modal";
import CreateCollection from "@/app/@modal/collections/form";

export default function Page() {
    return (
        <Modal title="Create a new collection" description="Fill the form to create a new collection and click on the Save button to submit.">
            <CreateCollection />
        </Modal>
    );
}
