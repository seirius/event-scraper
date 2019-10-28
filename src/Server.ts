import { Server } from '@overnightjs/core';
import bodyParser = require('body-parser');
import { DefaultController } from './controllers/Default.controller';
import * as swaggerUi from 'swagger-ui-express';
import { SwaggerConfig } from './Swagger';
import { ScrapperController } from './controllers/Scrapper.controller';

export class EventServer extends Server {

    public constructor() {
        super();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerConfig));

        super.addControllers([
            new DefaultController(),
            new ScrapperController()
        ]);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listenning on http://localhost:${port}`);
        });
    }

}