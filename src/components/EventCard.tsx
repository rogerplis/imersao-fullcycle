import { EventModel } from '@/types/Model';
import Link from 'next/link';
import React from 'react';

export type EventCardProps = {
    event: EventModel
}

function EventCard(props: EventCardProps){
    
    return (
        <Link href={`/events/${props.event.id}/spots-layout`}>
        <div className="flex w-[277px] flex-col rounded-2xl bg-secondary">
          <img src={props.event.image_url} alt={props.event.name}/>
          <div className="flex flex-col gap-y-2 px-4 py-6">
            <p className="text-sm uppercase text-subtitle">
              {
                new Date(props.event.date).toLocaleDateString("pt-BR",{
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                }
            )}
            </p>
            <p className="font-semibold">{props.event.name}</p>
            <p className="text-sm font-normal">{props.event.location}</p>
          </div>
        </div>
        </Link>
    )
}

export default EventCard;