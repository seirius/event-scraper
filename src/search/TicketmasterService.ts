import axios from "axios";
import * as cheerio from "cheerio";
import { Injectable } from "@nestjs/common";
import { WebTargetConfig } from "src/config/WebTargetConfig";
import { ScrappedEvent } from "./helpers/ScrappedEvent";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { promises } from "fs";
puppeteerExtra.use(StealthPlugin());

const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    `--user-agent="${WebTargetConfig.TICKETMASTER_HEADER_USER_AGENT}"`
];

const options = {
    args,
    headless: true
};

@Injectable()
export class TicketmasterService {
    private static readonly API_PATH = "/search";
    private static readonly RADIUS_PARAM_NAME = "radius";
    private static readonly RADIUS_PARAM = 10000;
    private static readonly SORT_PARAM_NAME = "sort";
    private static readonly SORT_PARM = "relevance%2Cdesc";
    private static readonly TAB_PARAM_NAME = "tab";
    private static readonly TAB_PARAM = "events";
    private static readonly Q_PARAM_NAME = "q";
    private static readonly DATE_RANGE_PARAM_NAME = "daterange";
    private static readonly DATE_RANGE_PARAM = "all";

    private static readonly TM_EVENT_TAB = "#tab--2";
    private static readonly TM_EVENT_ITEM = ".accordion__item.event-listing__item";

    public getTicketmasterQueryUrl(query: string): string {
        const url = new URL(TicketmasterService.API_PATH, WebTargetConfig.TICKETMASTER_URL);
        url.searchParams.append(TicketmasterService.RADIUS_PARAM_NAME, TicketmasterService.RADIUS_PARAM.toString());
        url.searchParams.append(TicketmasterService.SORT_PARAM_NAME, TicketmasterService.SORT_PARM);
        url.searchParams.append(TicketmasterService.TAB_PARAM_NAME, TicketmasterService.TAB_PARAM);
        url.searchParams.append(TicketmasterService.DATE_RANGE_PARAM_NAME, TicketmasterService.DATE_RANGE_PARAM);
        url.searchParams.append(TicketmasterService.Q_PARAM_NAME, query);
        return url.toString();
    }

    public async getTicketmasterEvents(query: string): Promise<ScrappedEvent[]> {
        const browser = await puppeteerExtra.launch(options);
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', request => {
            request.continue({
                headers: {
                    "user-agent": WebTargetConfig.TICKETMASTER_HEADER_USER_AGENT
                }
            });
        });
        await page.goto(this.getTicketmasterQueryUrl(query));
        await page.waitFor(2000);
        const pageHtml = await page.content();
        // const response = await axios(this.getTicketmasterQueryUrl(query), {
        //     headers: {
        //         "user-agent": WebTargetConfig.TICKETMASTER_HEADER_USER_AGENT
        //     }
        // });
        await browser.close();
        const $ = cheerio.load(pageHtml);
        await promises.writeFile("/home/andriy/text.html", pageHtml);
        const $tab = $(TicketmasterService.TM_EVENT_TAB);
        const $events = $($tab[0]).find(TicketmasterService.TM_EVENT_ITEM);
        $events.each((index, element) => {
            console.log(element);
        });
        return [];
    }
}