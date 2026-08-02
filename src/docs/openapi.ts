import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Storepilot REST API",
            version: "1.0.0",
            description: "API documentation for the Storepilot backend.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server",
            },
        ],
    },
    // This tells swagger-jsdoc where to find the annotations we just wrote
    apis: ["./src/modules/**/*.ts"],
};

export const openApiSpec = swaggerJSDoc(options);

// This generates the HTML page that loads the Swagger UI from a CDN
export const getSwaggerHtml = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Storepilot API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
</head>
<body style="margin:0; padding:0;">
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/docs/openapi.json',
        dom_id: '#swagger-ui',
      });
    };
  </script>
</body>
</html>`;
};
