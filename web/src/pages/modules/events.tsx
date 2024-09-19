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

    // Função para salvar dados no servidor
    const saveData = async (data: FormData) => {
        try {
            const response = await fetch('http://localhost:8000/unidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const responseText = await response.text(); // Obtenha a resposta como texto
            console.log('Resposta do servidor:', responseText); // Log da resposta
    
            if (!response.ok) {
                throw new Error('Erro ao salvar os dados: ' + responseText);
            }
    
            const result = JSON.parse(responseText); // Tenta converter a resposta para JSON
            console.log('Dados salvos com sucesso:', result);
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };
    


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData) {
            saveData(formData); // Chame a função saveData passando os dados do formulário
        }
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
                            Eventos
                        </button>
                    </nav>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit}>
                    {/* Conteúdo específico da aba */}
                    <div className="mb-4">
                        <label htmlFor="itemSelect" className="block text-sm font-medium text-gray-700 mb-2">
                            Selecione um item
                        </label>
                        <select id="itemSelect" value={selectedItem} onChange={handleSelectChange} className="block w-full px-4 py-2 border rounded-lg">
                            <option value="">Selecione</option>
                            {activeTab === 'unidades' && unidades.map((unidade) => (
                                <option key={unidade.nome_unidade} value={unidade.nome_unidade}>{unidade.nome_unidade}</option>
                            ))}
                            {activeTab === 'classes' && classes.map((classe) => (
                                <option key={classe.classe} value={classe.classe}>{classe.classe}</option>
                            ))}
                            {activeTab === 'eventos' && eventos.map((evento) => (
                                <option key={evento.title} value={evento.title}>{evento.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* Campos baseados no item selecionado */}
                    {formData && (
                        <div className="mb-4">
                            {Object.entries(formData).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                    <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                                    <input
                                        id={key}
                                        name={key}
                                        value={Array.isArray(value) ? value.join(', ') : value}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Botão de envio */}
                    <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Salvar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Events;
