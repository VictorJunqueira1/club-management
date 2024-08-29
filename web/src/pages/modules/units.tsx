import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

const Units = () => {
    const [unidades, setUnidades] = useState([
        {
            "nome_unidade": "Águia Dourada",
            "idade": "10 e 11 anos",
            "gênero": "Meninas",
            "responsável": "Dalila",
            "conselheiros": ["Barbara"],
            "auxiliares": ["Katia"]
        },
        {
            "nome_unidade": "Águia Real",
            "idade": "12 e 13 anos",
            "gênero": "Meninas",
            "responsável": "Agata",
            "conselheiros": ["Kely"],
            "auxiliares": ["Luana", "Sarah"]
        },
        {
            "nome_unidade": "Águia Negra",
            "idade": "14 anos",
            "gênero": "Meninas",
            "responsável": "Michele",
            "conselheiros": ["Larissa"],
            "auxiliares": []
        },
        {
            "nome_unidade": "Corujas Vermelhas",
            "idade": "15 anos",
            "gênero": "Meninas",
            "responsável": "Evelyn",
            "conselheiros": ["Camila"],
            "auxiliares": []
        },
        {
            "nome_unidade": "Gaviões do Rei",
            "idade": "10 e 11 anos",
            "gênero": "Meninos",
            "responsável": "William",
            "conselheiros": ["Ricardo (Samuel)"],
            "auxiliares": ["Victor Junqueira"]
        },
        {
            "nome_unidade": "Falcões da Eternidade",
            "idade": "12 e 13 anos",
            "gênero": "Meninos",
            "responsável": "Maike",
            "conselheiros": ["Nata"],
            "auxiliares": ["Pedro", "Filipe"]
        },
        {
            "nome_unidade": "Gavião Real",
            "idade": "14 e 15 anos",
            "gênero": "Meninos",
            "responsável": "Michel",
            "conselheiros": ["Abimael"],
            "auxiliares": ["Lucão"]
        }
    ]);

    const [generoFiltro, setGeneroFiltro] = useState('');
    const [nomePesquisa, setNomePesquisa] = useState('');

    const filtrarUnidades = () => {
        return unidades.filter(unidade => {
            const correspondeGenero = generoFiltro ? unidade.gênero.toLowerCase() === generoFiltro.toLowerCase() : true;
            const correspondeNome = nomePesquisa ? unidade.nome_unidade.toLowerCase().includes(nomePesquisa.toLowerCase()) : true;
            return correspondeGenero && correspondeNome;
        });
    };

    return (
        <>
            <main className="flex flex-col lg:flex-row items-start justify-center p-6 lg:pl-32 lg:pt-12 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-grow max-w-7xl mx-auto w-full bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-6 text-gray-900">Unidades</h1>

                        <div className="mb-8 flex flex-col lg:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Pesquisar por nome"
                                value={nomePesquisa}
                                onChange={(e) => setNomePesquisa(e.target.value)}
                                className="p-4 border border-gray-300 rounded-lg w-full lg:w-1/2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <select
                                value={generoFiltro}
                                onChange={(e) => setGeneroFiltro(e.target.value)}
                                className="p-4 border border-gray-300 rounded-lg w-full lg:w-1/2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Todos os gêneros</option>
                                <option value="Meninos">Meninos</option>
                                <option value="Meninas">Meninas</option>
                            </select>
                        </div>

                        <ul className="space-y-6">
                            {filtrarUnidades().map((unidade, index) => (
                                <li key={index} className="p-6 bg-white rounded-lg shadow-sm border flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex-grow">
                                        <div className="flex items-center mb-2">
                                            <h2 className="text-2xl font-semibold text-gray-800">{unidade.nome_unidade}</h2>
                                            <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${unidade.gênero === "Meninos" ? 'bg-blue-200 text-blue-800' : 'bg-pink-200 text-pink-800'}`}>
                                                {unidade.gênero}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-1"><strong>Idade:</strong> {unidade.idade}</p>
                                        <p className="text-gray-600 mb-1"><strong>Responsável:</strong> {unidade.responsável}</p>
                                        <p className="text-gray-600 mb-1"><strong>Conselheiros:</strong> {unidade.conselheiros.join(', ')}</p>
                                        <p className="text-gray-600"><strong>Auxiliares:</strong> {unidade.auxiliares.length > 0 ? unidade.auxiliares.join(', ') : "Nenhum"}</p>
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

export default Units;