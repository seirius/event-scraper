import { Injectable } from "@nestjs/common";
import { WebTargetConfig } from "src/config/WebTargetConfig";
import axios from "axios";
import * as cheerio from "cheerio";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import { EventHouse } from "./helpers/EventHouse";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

@Injectable()
export class NotikumiService {
    private static readonly NOTIKUMI_CLASS_VEVENT: string = ".vevent";
    private static readonly NOTIKUMI_QUERY: string = "q";

    public getNotikumiQueryUrl(query: string): string {
        const url = new URL(WebTargetConfig.NOTIKUMI_URL);
        url.searchParams.append(NotikumiService.NOTIKUMI_QUERY, query);
        return url.toString();
    }

    public async getNotikumiEvents(query: string): Promise<ScrappedEvent[]> {
        // TODO: pagination, check if the response is empty, if it is, stop the requests
        // if not make more request with &start=10+ until they are.
        const response = await axios(this.getNotikumiQueryUrl(query));
        const $ = cheerio.load(response.data);
        const events = $(NotikumiService.NOTIKUMI_CLASS_VEVENT);
        const scrappedEvents: ScrappedEvent[] = [];
        const currentDate = new Date();
        events.each((index, element) => {
            const $element = $(element);
            const title = $element.find(".summary").text()?.trim();
            const img = $element.find(".photo").attr("src");
            const day = Number.parseInt($element.find(".day").text()?.trim());
            const month = $element.find(".month").text()?.trim();
            let fullDate: Date;
            let multipleSessions = true;
            if (month !== "varias") {
                multipleSessions = false;
                const monthIndex = MONTHS.findIndex(monthLiteral => monthLiteral === month);
                fullDate = new Date(Date.UTC(currentDate.getFullYear(), monthIndex, day));
            }
            const date = {
                multipleSessions,
                dates: [fullDate]
            };
            const direction = $element.find(".dnd").text()?.replace(/\s\s+/g, ' ').trim();
            const url = $element.find(".url").attr("href");
            scrappedEvents.push({
                type: EventHouse.NOTIKUMI,
                title,
                img,
                date,
                direction,
                url
            });
        });
        return scrappedEvents;
    }
}