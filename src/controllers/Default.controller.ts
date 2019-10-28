import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';

@Controller('')
export class DefaultController {

    /**
     * @swagger
     * /ping:
     *  get:
     *      tags:
     *          - default
     *      responses:
     *          200:
     *              description: Pong
     */
    @Get('ping')
    public ping(req: Request, res: Response): void {
        res.status(OK).send('pong');
    }

}