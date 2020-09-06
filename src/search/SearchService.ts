import { Injectable } from "@nestjs/common";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import { NotikumiService } from "./NotikumiService";
import { WegowService } from "./WegowService";
import { EventHouse } from "./helpers/EventHouse";
import { TicketmasterService } from "./TicketmasterService";

@Injectable()
export class SearchService {

    constructor(
        private notikumiService: NotikumiService,
        private wegowService: WegowService,
        private ticketmasterService: TicketmasterService
    ) {}

    public async getScrappedEvents(query: string, houses: EventHouse[] = []): Promise<ScrappedEvent[]> {
        const houseRequests = [];
        if (!houses.length) {
            houseRequests.push(this.notikumiService.getNotikumiEvents(query));
            houseRequests.push(this.wegowService.getWegowEvents(query));
            houseRequests.push(this.ticketmasterService.getTicketmasterEvents(query));
        } else {
            if (houses.includes(EventHouse.WEGOW)) {
                houseRequests.push(this.wegowService.getWegowEvents(query));
            }
            if (houses.includes(EventHouse.NOTIKUMI)) {
                houseRequests.push(this.notikumiService.getNotikumiEvents(query));
            }
            if (houses.includes(EventHouse.TICKETMASTER)) {
                houseRequests.push(this.ticketmasterService.getTicketmasterEvents(query));
            }
        }

        const response = await Promise.all(houseRequests);
        const events = [];
        response.forEach(res => events.push(...res));
        return events;
    }

}