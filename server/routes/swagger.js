const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: "3.0.0",
    info : { // 정보 작성
        title : "CoKkiriMarket",
        version : "1.0.1",
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
        }
    ],
    schemas: ["https"],
    basePath : "/" // base path
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis : [__dirname + '/../routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;