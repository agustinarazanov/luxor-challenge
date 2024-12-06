import Modal from "@/app/(components)/modal";
import CreateBid from "./form";
import { getServerSession } from "next-auth";
import authOptions from "@/../auth";

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <Modal title="Place bid" description="Place a bid for the selected collection.">
            <CreateBid userId={session?.user.id} />
        </Modal>
    );
}
