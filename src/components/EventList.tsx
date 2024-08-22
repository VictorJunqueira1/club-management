import React, { useState } from 'react';
import EventCard from './EventCard';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

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
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
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
                <Pagination>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
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
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        Próximo
                    </PaginationNext>
                </Pagination>
            </div>
        </div>
    );
};

export default EventList;