import Aside from '@/components/Sidebar';
import { useState } from 'react';

// Definições dos tipos
interface Unidade {
    nome_unidade: string;
    idade: string;
    gênero: string;
    responsável: string;
    conselheiros: string[];
    auxiliares: string[];
}

interface Classe {
    classe: string;
    responsável: string;
    instrutores: string[];
}

interface Evento {
    date: string;
    time: string;
    location: string;
    title: string;
    description: string;
    officialDay: string;
}

type FormData = Unidade | Classe | Evento;

const Events = () => {
    const [activeTab, setActiveTab] = useState<'unidades' | 'classes' | 'eventos'>('unidades');
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [formData, setFormData] = useState<FormData | null>(null);

    // Dados fictícios para exemplo
    const unidades: Unidade[] = [
        { nome_unidade: "Águia Dourada", idade: "10 e 11 anos", gênero: "Meninas", responsável: "Dalila", conselheiros: ["Barbara"], auxiliares: ["Katia"] },
        { nome_unidade: "Águia Real", idade: "12 e 13 anos", gênero: "Meninas", responsável: "Agata", conselheiros: ["Kely"], auxiliares: ["Luana", "Sarah"] },
        { nome_unidade: "Águia Negra", idade: "14 anos", gênero: "Meninas", responsável: "Michele", conselheiros: ["Larissa"], auxiliares: [] },
        { nome_unidade: "Corujas Vermelhas", idade: "15 anos", gênero: "Meninas", responsável: "Evelyn", conselheiros: ["Camila"], auxiliares: [] },
        { nome_unidade: "Gaviões do Rei", idade: "10 e 11 anos", gênero: "Meninos", responsável: "William", conselheiros: ["Ricardo (Samuel)"], auxiliares: ["Victor Junqueira"] },
        { nome_unidade: "Falcões da Eternidade", idade: "12 e 13 anos", gênero: "Meninos", responsável: "Maike", conselheiros: ["Nata"], auxiliares: ["Pedro", "Filipe"] },
        { nome_unidade: "Gavião Real", idade: "14 e 15 anos", gênero: "Meninos", responsável: "Michel", conselheiros: ["Abimael"], auxiliares: ["Lucão"] }
    ];

    const classes: Classe[] = [
        { classe: "Amigo - 10", responsável: "Evelyn", instrutores: ["Vanessa", "Natã"] },
        { classe: "Companheiro - 11", responsável: "Agata", instrutores: ["Ricardo (Samuel)", "Barbara"] },
        { classe: "Pesquisador - 12", responsável: "Michele", instrutores: ["Dalila", "Larissa", "Pedro", "Katia", "Jhony"] },
        { classe: "Pioneiro - 13", responsável: "Rafaela", instrutores: ["Victor Junqueira", "Camila"] },
        { classe: "Excursionista - 14", responsável: "Maike", instrutores: ["Noeli", "Kely", "Filipe"] },
        { classe: "Guia - 15", responsável: "Michel", instrutores: ["Sarah", "Abimael"] },
        { classe: "Ordem Unida", responsável: "Lucão", instrutores: ["Abimael", "William", "Michel", "Michele", "Sarah", "Kely", "Jhony", "Filipe"] },
        { classe: "Agrupadas", responsável: "Lucão/Luana", instrutores: [] },
        { classe: "Libras e sinalização por bandeiras", responsável: "Dalila/Evelyn", instrutores: [] },
        { classe: "Nós e amarras", responsável: "Maike", instrutores: ["Douglas", "Michel", "Ricardo", "Sarah"] },
        { classe: "Fanfara", responsável: "Guilherme", instrutores: ["Noeli", "Agata"] },
        { classe: "Capelão", responsável: "Douglas", instrutores: ["Rafaela"] },
        { classe: "Estrutura acampamentos", responsável: "Douglas", instrutores: [] }
    ];

    const eventos: Evento[] = [
        { date: '2024-09-01', time: '10:00', location: 'Centro Comunitário', title: 'Encontro de Início de Ano', description: 'Reunião para iniciar o ano letivo.', officialDay: '2024-09-01' },
        { date: '2024-10-15', time: '14:00', location: 'Auditório Principal', title: 'Encontro de Meio de Ano', description: 'Encontro para revisar o progresso.', officialDay: '2024-10-15' },
        // Adicione mais eventos conforme necessário
    ];

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedItem(value);

        if (activeTab === 'unidades') {
            const selectedUnidade = unidades.find(u => u.nome_unidade === value);
            setFormData(selectedUnidade || null);
        } else if (activeTab === 'classes') {
            const selectedClasse = classes.find(c => c.classe === value);
            setFormData(selectedClasse || null);
        } else if (activeTab === 'eventos') {
            const selectedEvento = eventos.find(e => e.title === value);
            setFormData(selectedEvento || null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (!prev) return null;
            if (activeTab === 'unidades') {
                const updatedUnidade = { ...prev as Unidade, [name]: value.split(', ').map(v => v.trim()) };
                return updatedUnidade;
            }
            if (activeTab === 'classes') {
                const updatedClasse = { ...prev as Classe, [name]: value.split(', ').map(v => v.trim()) };
                return updatedClasse;
            }
            if (activeTab === 'eventos') {
                return { ...prev as Evento, [name]: value };
            }
            return prev;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Adicione aqui a lógica para salvar os dados do formulário
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Aside />

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-12 bg-white rounded-xl shadow-md lg:ml-80">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Gerenciar Eventos</h1>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-300 mb-4">
                    <nav className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab('unidades')}
                            className={`py-2 px-4 text-lg font-medium rounded-t-lg ${activeTab === 'unidades' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}
                        >
                            Unidades
                        </button>
                        <button
                            onClick={() => setActiveTab('classes')}
                            className={`py-2 px-4 text-lg font-medium rounded-t-lg ${activeTab === 'classes' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}
                        >
                            Classes
                        </button>
                        <button
                            onClick={() => setActiveTab('eventos')}
                            className={`py-2 px-4 text-lg font-medium rounded-t-lg ${activeTab === 'eventos' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}
                        >
                            Encontros
                        </button>
                    </nav>
                </div>

                {/* Tabs Content */}
                <div className="pt-6">
                    {activeTab === 'unidades' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Criar ou Modificar Unidades</h2>
                            {/* Seletor para Unidades */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Selecionar Unidade</label>
                                <select
                                    value={selectedItem}
                                    onChange={handleSelectChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                >
                                    <option value="">Selecione uma Unidade</option>
                                    {unidades.map(u => (
                                        <option key={u.nome_unidade} value={u.nome_unidade}>{u.nome_unidade}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Formulário para Unidades */}
                            {formData && 'nome_unidade' in formData && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Nome da Unidade</label>
                                        <input
                                            type="text"
                                            name="nome_unidade"
                                            value={formData.nome_unidade || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Nome da Unidade"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Idade</label>
                                        <input
                                            type="text"
                                            name="idade"
                                            value={formData.idade || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Idade"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Gênero</label>
                                        <input
                                            type="text"
                                            name="gênero"
                                            value={formData.gênero || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Gênero"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Responsável</label>
                                        <input
                                            type="text"
                                            name="responsável"
                                            value={formData.responsável || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Responsável"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Conselheiros (separados por vírgula)</label>
                                        <input
                                            type="text"
                                            name="conselheiros"
                                            value={(formData?.conselheiros || []).join(', ')}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Conselheiros"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Auxiliares (separados por vírgula)</label>
                                        <input
                                            type="text"
                                            name="auxiliares"
                                            value={(formData?.auxiliares || []).join(', ')}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Auxiliares"
                                        />
                                    </div>
                                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">Salvar Unidade</button>
                                </form>
                            )}
                        </div>
                    )}

                    {activeTab === 'classes' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Criar ou Modificar Classes</h2>
                            {/* Seletor para Classes */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Selecionar Classe</label>
                                <select
                                    value={selectedItem}
                                    onChange={handleSelectChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                >
                                    <option value="">Selecione uma Classe</option>
                                    {classes.map(c => (
                                        <option key={c.classe} value={c.classe}>{c.classe}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Formulário para Classes */}
                            {formData && 'classe' in formData && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Classe</label>
                                        <input
                                            type="text"
                                            name="classe"
                                            value={formData.classe || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Classe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Responsável</label>
                                        <input
                                            type="text"
                                            name="responsavel"
                                            value={formData.responsável || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Responsável"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Instrutores (separados por vírgula)</label>
                                        <input
                                            type="text"
                                            name="instrutores"
                                            value={(formData.instrutores || []).join(', ')}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Instrutores"
                                        />
                                    </div>
                                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">Salvar Classe</button>
                                </form>
                            )}
                        </div>
                    )}

                    {activeTab === 'eventos' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Criar ou Modificar Encontros</h2>
                            {/* Seletor para Encontros */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Selecionar Encontro</label>
                                <select
                                    value={selectedItem}
                                    onChange={handleSelectChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                >
                                    <option value="">Selecione um Encontro</option>
                                    {eventos.map(e => (
                                        <option key={e.title} value={e.title}>{e.title}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Formulário para Encontros */}
                            {formData && 'date' in formData && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Data</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Hora</label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Local</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Local"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Título</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Título"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Descrição</label>
                                        <textarea
                                            name="description"
                                            value={formData.description || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Descrição"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Dia Oficial</label>
                                        <input
                                            type="text"
                                            name="officialDay"
                                            value={formData.officialDay || ''}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                                            placeholder="Dia Oficial"
                                        />
                                    </div>
                                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">Salvar Encontro</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Events;