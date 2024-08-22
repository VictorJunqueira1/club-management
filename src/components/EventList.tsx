import React, { useState, useEffect } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);
    const eventsPerPage = 4;
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Check on initial render
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPaginationItems = () => {
        const maxPages = isMobile ? 4 : 5;
        const half = Math.floor(maxPages / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (totalPages <= maxPages) {
            start = 1;
            end = totalPages;
        } else {
            if (currentPage <= half) {
                end = maxPages;
            } else if (currentPage + half >= totalPages) {
                start = totalPages - maxPages + 1;
            }
        }

        return Array.from({ length: end - start + 1 }, (_, index) => start + index).map((page) => (
            <PaginationItem key={page}>
                <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                >
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));
    };

    return (
        <div className='w-full h-full flex flex-col justify-between'>
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
            <div className='mb-14'>
                <Pagination className="flex items-center justify-center">
                    {!isMobile && (
                        <>
                            <PaginationPrevious
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                Voltar
                            </PaginationPrevious>
                            <PaginationContent>
                                {renderPaginationItems()}
                            </PaginationContent>
                            <PaginationNext
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                Próximo
                            </PaginationNext>
                        </>
                    )}
                    {isMobile && (
                        <PaginationContent className="flex space-x-1">
                            {renderPaginationItems()}
                        </PaginationContent>
                    )}
                </Pagination>
            </div>
        </div>
    );
};

export default EventList;