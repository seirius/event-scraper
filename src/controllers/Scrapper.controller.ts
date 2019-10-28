import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Controller('scrapper')
export class ScrapperController {

    /**
     * @swagger
     * /scrapper/{query}:
     *  get:
     *      tags:
     *          - scrapper
     *      parameters:
     *          - in: path
     *            type: string
     *            name: query
     *            required: true
     *      responses:
     *          200:
     *              description: Query result
     */
    @Get(':query')
    public async scrap(req: Request, res: Response): Promise<void> {
        const {query} = req.params;
        const response = await axios(`https://www.notikumi.com/?q=${query}`);
        const $ = cheerio.load(response.data);
        const events = $('.vevent');
        const texts = [];
        events.each((index, element) => {
            texts.push($(element).text().replace(/\s\s+/g, ' ').trim());
        });
        res.send(texts);
    }

}