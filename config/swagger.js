import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'E-commerce API Documentation',
      version: '1.0.0',
      description: 'API endpoints for Users, Products, and Orders',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your API base URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files where you add docs
};

// Generate swagger specification
const specs = swaggerJsdoc(options);

// Middleware function to use in Express
const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;