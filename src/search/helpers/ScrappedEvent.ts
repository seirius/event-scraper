import { EventHouse } from "./EventHouse";

export interface ScrappedEvent {
    type: EventHouse;
    title: string;
    img: string;
    date: {
        multipleSessions: boolean;
        dates: Date[];
    }
    direction: string;
    url: string;
}