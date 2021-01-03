import express from 'express';
import cors from 'cors';
import routes from './routes';

import { errorHandler, logErrors, wrapErrors } from './utils/handlers/errorHandler'
import notFoundHandler from './utils/handlers/notFoundHandler'

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());

app.use('/', routes);

app.use(notFoundHandler);
//imprime en el terminal los errores
app.use(logErrors);
//determina los errores 
app.use(wrapErrors);
//maneja los errores y los devuelve
app.use(errorHandler);

export default app;
