import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const ViewerPanel = () => {
    return (
        <>
        <main className="flex items-center justify-center flex-col text-3xl h-screen">
            <Sidebar />
            <h1>Olá, Atividades!</h1>
            <Link href={"/auth/login"} className="bg-blue-500 rounded-md p-2 text-center mt-4 text-xl">Login</Link>
        </main>
        </>
    )
}

export default ViewerPanel;