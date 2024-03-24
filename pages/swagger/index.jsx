import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

// Définir les options Swagger JSDoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'Une API pour faire quelque chose de génial',
    },
  },
  apis: ['./pages/api/**/*.js'], // Endpoint path
};

const swaggerSpec = swaggerJSDoc(options);
// Build swagger on specific path
app.use('/api/movies', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
