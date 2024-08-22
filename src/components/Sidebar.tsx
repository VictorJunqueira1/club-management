import React, { useState } from 'react';
import { Users, NotepadText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Aside = () => {
    const router = useRouter();
    const { pathname } = router;
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const toggleSheet = () => {
        setIsSheetOpen(!isSheetOpen);
    };

    return (
        <>
            <aside className={`lg:flex lg:w-80 lg:bg-white lg:p-6 lg:shadow-lg lg:rounded-r-sm lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full lg:z-30 ${isSheetOpen ? 'block' : 'hidden'}`}>
                <button
                    onClick={toggleSheet}
                    className="lg:hidden p-2 text-white absolute top-4 right-4 z-40"
                >
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-black">Menu</h2>
                <nav>
                    <ul className="space-y-4">
                        <li className='hover:scale-105 duration-300'>
                            <Link href="/" className={`flex items-center p-3 rounded-md transition-colors hover:bg-blue-100 ${pathname === '/' ? 'bg-blue-200 text-black' : 'text-black'}`}>
                                <Menu className="w-6 h-6 mr-3 text-blue-500" />
                                <span className="text-lg font-medium">Início</span>
                            </Link>
                        </li>
                        <li className='hover:scale-105 duration-300'>
                            <Link href="/activities" className={`flex items-center p-3 rounded-md transition-colors hover:bg-blue-100 ${pathname === '/activities' ? 'bg-blue-200 text-white' : 'text-black'}`}>
                                <NotepadText className="w-6 h-6 mr-3 text-blue-500" />
                                <span className="text-lg font-medium">Atividades</span>
                            </Link>
                        </li>
                        <li className='hover:scale-105 duration-300'>
                            <Link href="/units" className={`flex items-center p-3 rounded-md transition-colors hover:bg-blue-100 ${pathname === '/units' ? 'bg-blue-200 text-white' : 'text-black'}`}>
                                <Users className="w-6 h-6 mr-3 text-blue-500" />
                                <span className="text-lg font-medium">Unidades</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto text-gray-500 text-sm text-center">
                    <p>&copy; 2024 Home Adventure. Todos os direitos reservados.</p>
                </div>
            </aside>

            {/* Toggle button for mobile view */}
            <button
                onClick={toggleSheet}
                className="lg:hidden fixed top-4 left-4 p-2 text-white bg-blue-500 rounded-full z-40"
            >
                <Menu className="w-6 h-6" />
            </button>
        </>
    );
};

export default Aside;