import CreateCollection from "@/app/@modal/collections/form";
import { getServerSession } from "next-auth";
import authOptions from "@/../auth";
import Modal from "@/app/(components)/modal";

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <Modal title="Create a new collection" description="Fill the form to create a new collection and click on the Save button to submit.">
            <CreateCollection userId={session?.user.id} />
        </Modal>
    );
}
