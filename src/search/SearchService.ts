import { Injectable } from "@nestjs/common";
import { WebTargetConfig } from "src/config/WebTargetConfig";

import axios from "axios";
import * as cheerio from "cheerio";

@Injectable()
export class SearchService {
    private static readonly NOTIKUMI_CLASS_VEVENT: string = ".vevent";
    private static readonly NOTIKUMI_QUERY: string = "q";

    public getNotikumiQueryUrl(query: string): string {
        const url = new URL(WebTargetConfig.NOTIKUMI_URL);
        url.searchParams.append(SearchService.NOTIKUMI_QUERY, query);
        return url.toString();
    }

    public async getNotikumiEvents(query: string): Promise<string[]> {
        const response = await axios(this.getNotikumiQueryUrl(query));
        const $ = cheerio.load(response.data);
        const events = $(SearchService.NOTIKUMI_CLASS_VEVENT);
        const texts = [];
        events.each((index, element) => {
            texts.push($(element).text().replace(/\s\s+/g, ' ').trim());
        });
        return texts;
    }
}