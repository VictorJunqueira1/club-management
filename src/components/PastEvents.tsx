import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

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
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 1;
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="bg-white p-6 rounded-lg border mt-6">
            <h2 className="text-xl font-semibold mb-4">Eventos Passados</h2>
            {currentEvents.length === 0 ? (
                <p className="text-gray-500">Nenhum evento passado registrado.</p>
            ) : (
                currentEvents.map((event, index) => (
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
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <Pagination>
                        <PaginationPrevious
                            onClick={currentPage === 1 ? undefined : () => handlePageChange(currentPage - 1)}
                            className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
                        >
                            Voltar
                        </PaginationPrevious>
                        <PaginationContent>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(index + 1)}
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                        <PaginationNext
                            onClick={currentPage === totalPages ? undefined : () => handlePageChange(currentPage + 1)}
                            className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
                        >
                            Próximo
                        </PaginationNext>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default PastEvents;