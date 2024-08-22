import React, { useState } from 'react';
import EventCard from './EventCard';

type EventListProps = {
    events: {
        date: string;
        time: string;
        location: string;
        title: string;
        description: string;
        isFree: boolean;
    }[];
};

const EventList: React.FC<EventListProps> = ({ events }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 3;
    const totalEvents = events.length;

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="space-y-4">
                {currentEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        date={event.date}
                        time={event.time}
                        location={event.location}
                        title={event.title}
                        description={event.description}
                        isFree={event.isFree}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(totalEvents / eventsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} transition-colors`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EventList;