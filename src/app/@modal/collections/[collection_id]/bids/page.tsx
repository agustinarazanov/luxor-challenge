import Modal from "@/app/(components)/modal";
import CreateBid from "./form";

export default function Page() {
    return (
        <Modal title="Place bid" description="Place a bid for the selected collection.">
            <CreateBid />
        </Modal>
    );
}
