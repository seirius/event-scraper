import * as cheerio from "cheerio";
import { Injectable } from "@nestjs/common";
import { WebTargetConfig } from "src/config/WebTargetConfig";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import { LaunchOptions } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlockPlugin from "puppeteer-extra-plugin-adblocker";
import { EventHouse } from "./helpers/EventHouse";
puppeteerExtra.use(StealthPlugin());
puppeteerExtra.use(AdBlockPlugin());

const options: LaunchOptions = {
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '-disable-gpu', '--no-first-run', '--disable-notifications'],
    ignoreDefaultArgs: ["--enable-automation"]
};

@Injectable()
export class TicketmasterService {
    private static readonly API_PATH = "/search";
    private static readonly TAB_PARAM_NAME = "tab";
    private static readonly TAB_PARAM = "events";
    private static readonly Q_PARAM_NAME = "q";

    private static readonly TM_EVENT_TAB = "#tab--2";
    private static readonly TM_EVENT_ITEM = ".accordion__item.event-listing__item";

    private static readonly CLASS_TITLE = ".event-tile__title";
    private static readonly CLASS_IMG = ".event-listing__thumbnail";
    private static readonly CLASS_ADDRESS = ".event-tile__sub-title";
    private static readonly CLASS_URL = ".event-listing__item-cta";

    private static readonly ATTR_SRC = "src";
    private static readonly ATTR_HREF = "href";

    private static readonly TIMEOUT_VALUE = 5000;

    public getTicketmasterQueryUrl(query: string): string {
        const url = new URL(TicketmasterService.API_PATH, WebTargetConfig.TICKETMASTER_URL);
        url.searchParams.append(TicketmasterService.TAB_PARAM_NAME, TicketmasterService.TAB_PARAM);
        url.searchParams.append(TicketmasterService.Q_PARAM_NAME, query);
        return url.toString();
    }

    public async getTicketmasterEvents(query: string): Promise<ScrappedEvent[]> {
        const browser = await puppeteerExtra.launch(options);
        const page = await browser.newPage();
        await page.setUserAgent(WebTargetConfig.TICKETMASTER_HEADER_USER_AGENT);
        await page.goto(this.getTicketmasterQueryUrl(query));
        await page.setJavaScriptEnabled(true);
        await page.setCacheEnabled(true);
        await page.waitForSelector(TicketmasterService.TM_EVENT_TAB, {
            timeout: TicketmasterService.TIMEOUT_VALUE
        });
        const pageHtml = await page.content();
        await browser.close();
        const $ = cheerio.load(pageHtml);
        const $tab = $(TicketmasterService.TM_EVENT_TAB);
        const $events = $($tab[0]).find(TicketmasterService.TM_EVENT_ITEM);
        const events: ScrappedEvent[] = [];
        $events.each((index, element) => {
            const $element = $(element);
            const title = $($element.find(TicketmasterService.CLASS_TITLE).get(0)).text();
            const img = $element.find(TicketmasterService.CLASS_IMG).attr(TicketmasterService.ATTR_SRC);
            const address = $element.find(TicketmasterService.CLASS_ADDRESS).text();
            const url = $element.find(TicketmasterService.CLASS_URL).attr(TicketmasterService.ATTR_HREF);
            const imgObject = new URL(img);
            events.push({
                type: EventHouse.TICKETMASTER,
                title,
                img: imgObject.origin + imgObject.pathname,
                url,
                instances: [
                    {
                        address,
                        dates: []
                    }
                ]
            });
        });
        return events;
    }
}