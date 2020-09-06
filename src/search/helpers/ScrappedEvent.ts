import { EventHouse } from "./EventHouse";

export interface ScrappedEvent {
    type: EventHouse;
    title: string;
    img: string;
    url: string;
    instances: {
        dates: Date[];
        address: string;
    }[];
}