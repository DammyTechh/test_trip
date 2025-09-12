const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tripitify API',
      version: '1.0.0',
      description: 'A comprehensive trip planning API with user authentication and onboarding',
      contact: {
        name: 'Tripitify Team',
        email: 'support@tripitify.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.tripitify.com' 
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: {
              type: 'integer',
              format: 'int64',
              description: 'Unique user identifier',
            },
            first_name: {
              type: 'string',
              maxLength: 45,
              description: 'User first name',
            },
            last_name: {
              type: 'string',
              maxLength: 45,
              description: 'User last name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            is_verified: {
              type: 'boolean',
              description: 'Email verification status',
            },
            is_onboarded: {
              type: 'boolean',
              description: 'Onboarding completion status',
            },
            usertype_id: {
              type: 'integer',
              description: 'User type identifier',
            },
          },
        },
        UserType: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User type identifier',
            },
            name: {
              type: 'string',
              maxLength: 45,
              description: 'User type name',
            },
            description: {
              type: 'string',
              maxLength: 45,
              description: 'User type description',
            },
          },
        },
        Interest: {
          type: 'object',
          properties: {
            interest_id: {
              type: 'integer',
              format: 'int64',
              description: 'Interest identifier',
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'Interest name',
            },
            description: {
              type: 'string',
              maxLength: 255,
              description: 'Interest description',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            data: {
              type: 'object',
              nullable: true,
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success',
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
            data: {
              type: 'object',
              nullable: true,
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success',
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
            data: {
              type: 'object',
              properties: {
                authenticated: {
                  type: 'boolean',
                  example: true,
                },
                token: {
                  type: 'string',
                  description: 'JWT access token',
                },
                user: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};