import Aside from '@/components/Sidebar';
import { useState } from 'react';

// Definições dos tipos
type Unidade = {
    nome_unidade: string;
    idade: string;
    gênero: string;
    responsável: string;
    conselheiros: string[];
    auxiliares: string[];
}

type Classe = {
    classe: string;
    responsável: string;
    instrutores: string[];
}

type Evento = {
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
    const [formData, setFormData] = useState<FormData | null>(null);

    // Dados reais devem ser adicionados aqui
    const unidades: Unidade[] = [];
    const classes: Classe[] = [];
    const eventos: Evento[] = [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (!prev) return null;
            if (activeTab === 'unidades') {
                return { ...prev as Unidade, [name]: value.split(', ').map(v => v.trim()) };
            }
            if (activeTab === 'classes') {
                return { ...prev as Classe, [name]: value.split(', ').map(v => v.trim()) };
            }
            if (activeTab === 'eventos') {
                return { ...prev as Evento, [name]: value };
            }
            return prev;
        });
    };

    const saveData = async (data: FormData) => {
        try {
            const response = await fetch('http://localhost:8000/unidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseText = await response.text();
            console.log('Resposta do servidor:', responseText);

            if (!response.ok) {
                throw new Error('Erro ao salvar os dados: ' + responseText);
            }

            const result = JSON.parse(responseText);
            console.log('Dados salvos com sucesso:', result);
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData) {
            saveData(formData);
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
                            onClick={() => {
                                setActiveTab('unidades');
                                setFormData(null);
                            }}
                            className={`py-2 px-4 text-lg font-medium rounded-t-lg ${activeTab === 'unidades' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}
                        >
                            Unidades
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('classes');
                                setFormData(null);
                            }}
                            className={`py-2 px-4 text-lg font-medium rounded-t-lg ${activeTab === 'classes' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}
                        >
                            Classes
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('eventos');
                                setFormData(null);
                            }}
                            className={`py-2 px-4 text-lg font-medium rounded-t-lg ${activeTab === 'eventos' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50'}`}
                        >
                            Eventos
                        </button>
                    </nav>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit}>
                    {/* Campos baseados na aba ativa */}
                    {activeTab === 'unidades' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="nome_unidade" className="block text-sm font-medium text-gray-700 mb-2">Nome da Unidade</label>
                                <input id="nome_unidade" name="nome_unidade" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                                <input id="idade" name="idade" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gênero" className="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
                                <input id="gênero" name="gênero" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="responsável" className="block text-sm font-medium text-gray-700 mb-2">Responsável</label>
                                <input id="responsável" name="responsável" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="conselheiros" className="block text-sm font-medium text-gray-700 mb-2">Conselheiros</label>
                                <input id="conselheiros" name="conselheiros" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="auxiliares" className="block text-sm font-medium text-gray-700 mb-2">Auxiliares</label>
                                <input id="auxiliares" name="auxiliares" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </>
                    )}

                    {activeTab === 'classes' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="classe" className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
                                <input id="classe" name="classe" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="responsável" className="block text-sm font-medium text-gray-700 mb-2">Responsável</label>
                                <input id="responsável" name="responsável" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="instrutores" className="block text-sm font-medium text-gray-700 mb-2">Instrutores</label>
                                <input id="instrutores" name="instrutores" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </>
                    )}

                    {activeTab === 'eventos' && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                                <input id="date" name="date" type="date" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                                <input id="time" name="time" type="time" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
                                <input id="location" name="location" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                                <input id="title" name="title" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                                <textarea id="description" name="description" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="officialDay" className="block text-sm font-medium text-gray-700 mb-2">Dia Oficial</label>
                                <input id="officialDay" name="officialDay" onChange={handleChange} className="block w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </>
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
