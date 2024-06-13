import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "PFMS API Documentation",
      version: "1.0.0",
      description: "API documentation for your PFMS application",
    },
    servers: [
      {
        url: "http://localhost:2001", // Update with your server URL
        description: "Development server",
      },
    ],
  },
  apis: ["**/*.ts"], // Update with your route file paths
};

export default swaggerJsdoc(options);

// import swaggerJSDoc from "swagger-jsdoc";

// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "PFMS API Documentation",
//       version: "1.0.0",
//       description: "API documentation for your PFMS application",
//     },
//     servers: [
//       {
//         url: "http://localhost:2001", // Update with your server URL
//         description: "Development server",
//       },
//     ],
//   },
//   apis: ["./src/apis/route/**/*.ts"], // Update with your route file paths
// };

// const swaggerSpec = swaggerJSDoc(options);

// export default swaggerSpec;
