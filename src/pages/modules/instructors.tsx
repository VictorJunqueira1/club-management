import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

const Instructors = () => {
    const [classes, setClasses] = useState([
        {
            "classe": "Amigo - 10",
            "responsavel": "Evelyn",
            "instrutores": [
                "Vanessa",
                "Natã"
            ]
        },
        {
            "classe": "Companheiro - 11",
            "responsavel": "Agata",
            "instrutores": [
                "Ricardo (Samuel)",
                "Barbara"
            ]
        },
        {
            "classe": "Pesquisador - 12",
            "responsavel": "Michele",
            "instrutores": [
                "Dalila",
                "Larissa",
                "Pedro",
                "Katia",
                "Jhony"
            ]
        },
        {
            "classe": "Pioneiro - 13",
            "responsavel": "Rafaela",
            "instrutores": [
                "Victor Junqueira",
                "Camila"
            ]
        },
        {
            "classe": "Excursionista - 14",
            "responsavel": "Maike",
            "instrutores": [
                "Noeli",
                "Kely",
                "Filipe"
            ]
        },
        {
            "classe": "Guia - 15",
            "responsavel": "Michel",
            "instrutores": [
                "Sarah",
                "Abimael"
            ]
        },
        {
            "classe": "Ordem Unida",
            "responsavel": "Lucão",
            "instrutores": [
                "Abimael",
                "William",
                "Michel",
                "Michele",
                "Sarah",
                "Kely",
                "Jhony",
                "Filipe"
            ]
        },
        {
            "classe": "Agrupadas",
            "responsavel": "Lucão/Luana",
            "instrutores": []
        },
        {
            "classe": "Libras e sinalização por bandeiras",
            "responsavel": "Dalila/Evelyn",
            "instrutores": []
        },
        {
            "classe": "Nós e amarras",
            "responsavel": "Maike",
            "instrutores": [
                "Douglas",
                "Michel",
                "Ricardo",
                "Sarah"
            ]
        },
        {
            "classe": "Fanfara",
            "responsavel": "Guilherme",
            "instrutores": [
                "Noeli",
                "Agata"
            ]
        },
        {
            "classe": "Capelão",
            "responsavel": "Douglas",
            "instrutores": [
                "Rafaela"
            ]
        },
        {
            "classe": "Estrutura acampamentos",
            "responsavel": "Douglas",
            "instrutores": []
        }
    ]);

    const [nomePesquisa, setNomePesquisa] = useState('');

    const filtrarClasses = () => {
        return classes.filter(classe =>
            classe.classe.toLowerCase().includes(nomePesquisa.toLowerCase())
        );
    };

    return (
        <>
            <main className="flex flex-col lg:flex-row items-start justify-center p-6 lg:p-12 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-grow max-w-7xl mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">Instrutores</h1>

                        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Pesquisar por classe"
                                value={nomePesquisa}
                                onChange={(e) => setNomePesquisa(e.target.value)}
                                className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full lg:w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <ul className="space-y-6 sm:space-y-8">
                            {filtrarClasses().map((classe, index) => (
                                <li
                                    key={index}
                                    className="p-5 sm:p-6 rounded-lg shadow-sm border flex flex-col lg:flex-row lg:items-center lg:justify-between"
                                >
                                    <div className="flex-grow">
                                        <h2 className="text-2xl sm:text-3xl mb-3 sm:mb-4">{classe.classe}</h2>
                                        <p className="text-base sm:text-lg text-gray-700 mb-2 sm:mb-2.5 flex items-center">
                                            <strong className='mr-1'>Responsável:</strong> {classe.responsavel}
                                        </p>
                                        <p className="text-base sm:text-lg text-gray-700 flex items-center">
                                            <strong className='mr-1'>Instrutores:</strong> {classe.instrutores.length > 0 ? classe.instrutores.join(', ') : "Nenhum"}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Instructors;