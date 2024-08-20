import Link from "next/link";

const DirectorPanel = () => {
    return (
        <>
        <main className="flex items-center justify-center flex-col text-3xl h-screen">
            <h1>Olá, Diretoria!</h1>
            <Link href={"/auth/login"} className="bg-blue-500 rounded-md p-2 text-center mt-4 text-xl">Login</Link>
        </main>
        </>
    )
}

export default DirectorPanel;