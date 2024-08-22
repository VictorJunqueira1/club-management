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
            date: "1 Jun",
            time: "14:00",
            location: "Escola Almerinda",
            title: "Evento Antigo",
            description: "Descrição do evento passado.",
            isFree: false,
        },
        {
            date: "10 Jun",
            time: "09:00",
            location: "Escola Almerinda",
            title: "Evento Antigo",
            description: "Descrição do evento passado.",
            isFree: false,
        },
    ];

    const upcomingEvents = [
        {
            date: "8 Jul",
            time: "09:00",
            location: "Escola Almerinda",
            title: "Encontro do Clube de Desbravadores",
            description: "Participe do encontro mensal do clube. Vamos discutir as atividades planejadas e fazer novas amizades.",
            isFree: true,
        },
        {
            date: "15 Jul",
            time: "14:00",
            location: "Parque Central",
            title: "Atividade ao Ar Livre",
            description: "Junte-se a nós para uma tarde de atividades ao ar livre e diversão no parque. Traga sua família e amigos!",
            isFree: true,
        },
        {
            date: "22 Jul",
            time: "10:00",
            location: "Centro Comunitário",
            title: "Workshop de Habilidades",
            description: "Oferecemos um workshop para desenvolver novas habilidades e aprender coisas novas. Não perca essa oportunidade!",
            isFree: false,
        },
        {
            date: "29 Jul",
            time: "18:00",
            location: "Escola Almerinda",
            title: "Reunião de Planejamento",
            description: "Reunião para planejar as próximas atividades do clube. Sua participação é fundamental para o sucesso dos eventos futuros.",
            isFree: true,
        },
        {
            date: "5 Ago",
            time: "16:00",
            location: "Auditório Municipal",
            title: "Palestra sobre Liderança",
            description: "Participe de uma palestra inspiradora sobre liderança e como ser um líder eficaz em sua comunidade.",
            isFree: true,
        },
        {
            date: "12 Ago",
            time: "09:00",
            location: "Escola Almerinda",
            title: "Dia de Voluntariado",
            description: "Venha ajudar em um dia de voluntariado para apoiar a nossa comunidade. Serão realizadas várias atividades beneficentes.",
            isFree: true,
        },
    ];

    return (
        <>
            <main className="flex lg:pl-8 items-start justify-center flex-col lg:flex-row p-6 lg:p-12 h-screen text-gray-800 lg:ml-80">
                <Sidebar />
                <div className="max-w-7xl mx-auto flex-grow w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Seção do Calendário e Eventos Passados */}
                        <div className="flex flex-col gap-6">
                            <div className="flex-grow flex flex-col">
                                <div className="flex-grow">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="w-full rounded-md border"
                                        locale={pt}
                                    />
                                </div>
                                <div className="mt-6">
                                    <PastEvents events={pastEvents} />
                                </div>
                            </div>
                        </div>

                        {/* Seção de Próximos Eventos */}
                        <div className="col-span-1 xl:col-span-2 bg-white p-6 rounded-lg border">
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