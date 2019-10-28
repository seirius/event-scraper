import * as swagger from 'swagger-jsdoc';

export const SwaggerConfig = swagger({
    apis: ['**/*.controller.ts'],
    swaggerDefinition: {
        info: {
            description: 'Event Scrapper',
            title: 'Event Scrapper',
            version: '0.0.1',
        },
    },
});
