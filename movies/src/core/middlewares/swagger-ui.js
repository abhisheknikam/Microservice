import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, API_PORT, API_HOSTNAME, APP_NAME } from '../constants';

const routes = Router();

if (NODE_ENV !== 'production') {
    const swaggerDefinition = {
        // Like the one described here: https://swagger.io/specification/#infoObject
        info: {
            title: `${APP_NAME} Swagger APIs`,
            version: '0.0.1',
            description: 'Mobile app and CMS api swagger docs',
            contact: {
                name: 'API Support',
                email: 'pradeepchauhan.pegasus@gmail.com'
            }
        },
        openapi: '3.0.2',
        tags: [
            {
                name: 'otp',
                description: 'Everything about Generating and Verifying OTPs'
            },
            {
                name: 'countryPhoneCodes',
                description:
                    'APIs related to get country wise phone code on the basis' +
                    'of user IP and list all country phone codes'
            },
            {
                name: 'userLogin',
                description: 'Mobile app login api'
            },
            {
                name: 'userRegister',
                description: 'Mobile app register api'
            }
        ],
        servers: [
            {
                url: `http://${API_HOSTNAME}:${API_PORT}`,
                description: 'Our only single server'
            }
        ]
    };

    // options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition,
        // path to the API docs
        apis: [
            './**/api/schemas/*.js',
            './**/cms/schemas/*.js',
            './**/api/controllers/*.js',
            './**/cms/controllers/*.js'
        ]
    };

    // initialize swagger-jsdoc
    const swaggerSpec = swaggerJSDoc(options);
    // serve swagger
    routes.get('/swagger.json', function serverSwaggerDocs(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    routes.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default routes;
