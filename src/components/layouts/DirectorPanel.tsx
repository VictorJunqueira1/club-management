import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Calendar } from "@/components/ui/calendar";
import EventList from "@/components/EventList";
import PastEvents from "@/components/PastEvents";
import { pt } from "date-fns/locale";

const DiretorPainel = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const pastEvents = [
        {
            date: "4 Jul",
            time: "08:00",
            location: "Escola Almerinda",
            title: "Encontro do Clube de Desbravadores",
            description: "Participe do encontro mensal do clube. Vamos discutir as atividades planejadas e fazer novas amizades.",
        }
    ];

    const upcomingEvents = [
        {
            date: "8 Jul",
            time: "09:00",
            location: "Escola Almerinda",
            title: "Encontro do Clube de Desbravadores",
            description: "Participe do encontro mensal do clube. Vamos discutir as atividades planejadas e fazer novas amizades.",
        },
        {
            date: "15 Jul",
            time: "14:00",
            location: "Parque Central",
            title: "Atividade ao Ar Livre",
            description: "Junte-se a nós para uma tarde de atividades ao ar livre e diversão no parque. Traga sua família e amigos!",
        },
        {
            date: "22 Jul",
            time: "10:00",
            location: "Centro Comunitário",
            title: "Workshop de Habilidades",
            description: "Oferecemos um workshop para desenvolver novas habilidades e aprender coisas novas. Não perca essa oportunidade!",
        },
        {
            date: "29 Jul",
            time: "18:00",
            location: "Escola Almerinda",
            title: "Reunião de Planejamento",
            description: "Reunião para planejar as próximas atividades do clube. Sua participação é fundamental para o sucesso dos eventos futuros.",
        },
        {
            date: "8 Jul",
            time: "09:00",
            location: "Escola Almerinda",
            title: "Encontro do Clube de Desbravadores",
            description: "Participe do encontro mensal do clube. Vamos discutir as atividades planejadas e fazer novas amizades.",
        },
    ];

    return (
        <>
            <main className="flex flex-col lg:flex-row items-start justify-center p-6 lg:p-12 min-h-screen text-gray-800 lg:ml-80">
                <Sidebar />
                {/* Conteúdo principal */}
                <div className="max-w-7xl mx-auto flex-grow w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
                        {/* Seção do Calendário */}
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col h-full">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="w-full rounded-md border"
                                    locale={pt}
                                />
                                {/* Seção de Eventos Passados */}
                                <div>
                                    <PastEvents events={pastEvents} />
                                </div>
                            </div>
                        </div>
                        {/* Seção de Próximos Eventos */}
                        <div className="col-span-1 xl:col-span-2 bg-white p-6 border rounded-md">
                            <h2 className="text-xl font-semibold mb-4">Próximos Eventos</h2>
                            <EventList events={upcomingEvents} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DiretorPainel;