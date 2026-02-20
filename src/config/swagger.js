import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            author: { $ref: "#/components/schemas/User" },
            createdAt: { type: "string" }
          },
        },
        Comment: {
          type: "object",
          properties: {
            id: { type: "string" },
            text: { type: "string" },
            author: { $ref: "#/components/schemas/User" },
            postId: { type: "string" },
            createdAt: { type: "string" }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
      tags: [
  { name: "Auth" },
  { name: "Users" },
  { name: "Posts" },
  { name: "Comments" }
],


  apis: ['./src/modules/**/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
