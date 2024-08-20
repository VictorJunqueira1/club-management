import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

type Unit = {
    name: string;
    age: string;
    gender: string;
    counselors: string[];
    instructors: string[];
};

type Event = {
    date: string;
    activities: string[];
};

const DirectorPanel = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const mockUnits: Unit[] = [
            {
                name: "Unidade Gavião Real",
                age: "14-15",
                gender: "Masculino",
                counselors: ["Michel", "Abimael", "Lucão"],
                instructors: ["Michel", "Abimael"]
            },
            {
                name: "Falcões da Eternidade",
                age: "12-13",
                gender: "Masculino",
                counselors: ["Maike", "Natã", "Pedro", "Felipe"],
                instructors: ["Maike", "Noely"]
            },
            {
                name: "Unidade Gavião Real",
                age: "14-15",
                gender: "Masculino",
                counselors: ["Michel", "Abimael", "Lucão"],
                instructors: ["Michel", "Abimael"]
            },
            {
                name: "Falcões da Eternidade",
                age: "12-13",
                gender: "Masculino",
                counselors: ["Maike", "Natã", "Pedro", "Felipe"],
                instructors: ["Maike", "Noely"]
            },
        ];

        const mockEvents: Event[] = [
            {
                date: "24/08/2024",
                activities: ["Atividade 1", "Atividade 2"]
            },
            {
                date: "06/09/2024",
                activities: ["Atividade 3", "Atividade 4"]
            },
            {
                date: "24/08/2024",
                activities: ["Atividade 1", "Atividade 2"]
            },
            {
                date: "06/09/2024",
                activities: ["Atividade 3", "Atividade 4"]
            },
        ];

        setUnits(mockUnits);
        setEvents(mockEvents);
    }, []);

    return (
        <>
            <main className="flex lg:pl-48 items-start justify-center flex-col lg:flex-row p-6 lg:p-12 h-screen bg-gray-100 text-gray-800">
                <Sidebar />
                <div className="lg:w-3/4 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-700 mb-6">Unidades</h1>
                            {units.map((unit, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-sm rounded-lg p-6 mb-4 transition transform hover:-translate-y-1 hover:shadow-md"
                                >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{unit.name}</h2>
                                    <p className="text-gray-600">Idade: <span className="font-medium">{unit.age}</span></p>
                                    <p className="text-gray-600">Sexo: <span className="font-medium">{unit.gender}</span></p>
                                    <p className="text-gray-600">Conselheiros: <span className="font-medium">{unit.counselors.join(", ")}</span></p>
                                    <p className="text-gray-600">Instrutores: <span className="font-medium">{unit.instructors.join(", ")}</span></p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold text-gray-700 mb-6">Próximos Encontros</h1>
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-sm rounded-lg p-6 mb-4 transition transform hover:-translate-y-1 hover:shadow-md"
                                >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.date}</h2>
                                    <p className="text-gray-600">Atividades: <span className="font-medium">{event.activities.join(", ")}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default DirectorPanel;