const swaggerAutogen = require('swagger-autogen')();

const doc = {
    swagger: "3.0",
    info: {
        version: "0.0.1",
        title: "User APIs",
        description: "Documentation created by <b>GRC</b>"
    },
    host: 'localhost:3000',
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Users",
            "description": "Endpoints"
        }
    ],
    requests: {
        AddUser:{
            type: 'object',
            description: "Register request",
            required: ['first_name', 'last_name','email','phone'],
            properties: {
                first_name: {
                    type: 'string',
                    description: 'First Name',
                    example: "John"
                },
                last_name: {
                    type: 'string',
                    description: 'Last Name',
                    example: "Doe"
                },
                email: {
                    type: 'string',
                    description: 'User login email',
                    example: "user@example.com"
                },
                phone: {
                    type: 'string',
                    description: 'User Phone No',
                    example: "9999999999"
                }
            }
        },
        UpdateUser:{
            type: 'object',
            description: "Register request",
            properties: {
                first_name: {
                    type: 'string',
                    description: 'First Name',
                    example: "John"
                },
                last_name: {
                    type: 'string',
                    description: 'Last Name',
                    example: "Doe"
                },
                email: {
                    type: 'string',
                    description: 'User login email',
                    example: "user@example.com"
                },
                phone: {
                    type: 'string',
                    description: 'User Phone No',
                    example: "9999999999"
                }
            }
        }
    },
    definitions: {
        UserCreationSuccessResponse: {
            "status": 200,
            "message": "User created successfully",
            "data": {
              "id": "a125dc6d-7b05-4b20-9b36-9e8e6821b4ed",
              "first_name": "John",
              "last_name": "Doe",
              "email": "user@example.com",
              "phone": "9999999991",
              "created_at": "2023-12-02T13:19:04.000Z",
              "updated_at": "2023-12-02T13:19:04.000Z",
              "_id": "656b2f12c010066a59ede68f",
              "__v": 0
            },
            "error": {}
          }
    }
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointFiles, doc);