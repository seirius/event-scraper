import { Injectable } from "@nestjs/common";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import axios from "axios";
import { WebTargetConfig } from "src/config/WebTargetConfig";
import { WegowEvent } from "./helpers/WegowEvent";
import { EventHouse } from "./helpers/EventHouse";

Injectable()
export class WegowService {

    private static readonly PARAM_NAME_QUERY = "query";
    private static readonly PARAM_NAME_PAGE_SIZE = "page_size";
    private static readonly PAGE_SIZE = 100;
    private static readonly PARAM_NAME_PAGE = "page";
    private static readonly PAGE = 1;
    private static readonly PARAM_NAME_REGION = "region";
    private static readonly REGION = "en-es";
    private static readonly PARAM_NAME_LANG = "lang";
    private static readonly LANG = "es";

    private static readonly API_PATH = "/api/search/events/";

    public getWegowQueryUrl(query: string): string {
        const url = new URL(WegowService.API_PATH, WebTargetConfig.WEGOW_URL);
        url.searchParams.append(WegowService.PARAM_NAME_PAGE_SIZE, WegowService.PAGE_SIZE.toString());
        url.searchParams.append(WegowService.PARAM_NAME_PAGE, WegowService.PAGE.toString());
        url.searchParams.append(WegowService.PARAM_NAME_REGION, WegowService.REGION);
        url.searchParams.append(WegowService.PARAM_NAME_LANG, WegowService.LANG);
        url.searchParams.append(WegowService.PARAM_NAME_QUERY, query);
        return url.toString();
    }

    public async getWegowEvents(query: string): Promise<ScrappedEvent[]> {
        const { data } = await axios(this.getWegowQueryUrl(query));
        const { events }: { events: WegowEvent[]; } = data;
        return events.map(wegowEventToScrappedEvent);
    }

}

export function wegowEventToScrappedEvent({
        city: {
            name,
            administrative_division,
            country,
        },
        title,
        start_date,
        purchase_url,
        image_url
    }: WegowEvent): ScrappedEvent {
    return {
        type: EventHouse.WEGOW,
        title,
        img: image_url,
        instances: [
            {
                dates: [new Date(start_date)],
                address: `${country}, ${administrative_division}, ${name}`
            }
        ],
        url: purchase_url
    };
}