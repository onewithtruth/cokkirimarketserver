const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: "3.0.0",
    info : { // 정보 작성
        title : "CoKkiriMarket",
        version : "1.0.2",
        description : "CoKkiriMarket API DOCs",
        contact: {
            name: 'cokkiri',
        },
    },
    host : "https://api.cokkirimarket.xyz", // base-url
    servers: [
        {
            url: "https://api.cokkirimarket.xyz",
            description: "production server",
        },
        {
            url: "https://dev1.cokkirimarket.xyz",
            description: "development server(dahyeon)"
        },
        {
            url: "https://dev2.cokkirimarket.xyz",
            description: "development server(hojin)"
        }
    ],
    schemas: [],
    basePath : '/', // base path
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis : [`${__dirname}/../routes/*.js`, __dirname + `${__dirname}/predefinedspec/*.yaml`],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;