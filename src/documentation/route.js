const express= require('express');
const router= express.Router();
const { swaggerUi, specs } = require("../config/swagger");


router.get(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Tripitify API Documentation",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: "none",
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  })
);
module.exports= router;
