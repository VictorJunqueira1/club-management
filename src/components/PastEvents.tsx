import React from 'react';
import EventCard from '@/components/EventCard';

interface PastEventsProps {
    events: {
        date: string;
        time: string;
        location: string;
        title: string;
        description: string;
        isFree: boolean;
    }[];
}

const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
    return (
        <div className="bg-white p-6 rounded-lg mt-6 border">
            <h2 className="text-xl font-semibold mb-4">Último Evento</h2>
            {events.length === 0 ? (
                <p className="text-gray-500">Nenhum evento passado registrado.</p>
            ) : (
                events.map((event, index) => (
                    <EventCard
                        key={index}
                        date={event.date}
                        time={event.time}
                        location={event.location}
                        title={event.title}
                        description={event.description}
                        isFree={event.isFree}
                    />
                ))
            )}
        </div>
    );
};

export default PastEvents;