import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const Units = () => {
    return (
        <>
            <main className="flex items-center justify-center flex-col text-3xl h-screen">
                <Sidebar />
                <h1>Olá, Unidades!</h1>
            </main>
        </>
    );
};

export default Units;