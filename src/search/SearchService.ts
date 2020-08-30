import { Injectable } from "@nestjs/common";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import { NotikumiService } from "./NotikumiService";
import { WegowService } from "./WegowService";

@Injectable()
export class SearchService {

    constructor(
        private notikumiService: NotikumiService,
        private wegowService: WegowService,
    ) {}

    public async getScrappedEvents(query: string): Promise<ScrappedEvent[]> {
        const response = await Promise.all([
            this.notikumiService.getNotikumiEvents(query),
            this.wegowService.getWegowEvents(query),
        ]);
        const events = [];
        response.forEach(res => events.push(...res));
        return events;
    }

}