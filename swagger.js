const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Contact API',
        description: 'API for managing contacts'
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contact.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);