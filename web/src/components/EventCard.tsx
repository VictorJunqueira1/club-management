import { MapPin } from 'lucide-react';
import React from 'react';

type EventCardProps = {
    date: string;
    time: string;
    location: string;
    title: string;
    description: string;
    officialDay: string
}

const EventCard: React.FC<EventCardProps> = ({ date, time, location, title, description, officialDay }) => {
    return (
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 border">
            <div className="flex items-start mb-2">
                <div className="text-center mr-4">
                    <p className="text-lg font-semibold">{date}</p>
                    <p className="text-gray-500">{time}</p>
                </div>
                <div className="flex-grow border-l-4 border-blue-500 pl-4">
                    <a href="#" className="text-blue-500 hover:underline flex items-center gap-1"><MapPin className='h-4 w-4' /> {location}</a>
                    <h3 className="text-lg font-semibold mt-1">{title}</h3>
                    <p className="text-gray-600 mt-1">{description}</p>
                    <p className="text-gray-600 mt-1">{officialDay ? `Oficial do Dia: ${officialDay}` : ''}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;