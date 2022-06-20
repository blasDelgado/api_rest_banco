import express from 'express';
import morgan from 'morgan';
import rutaAdmin from './routes/rutas-admin';

const app = express();

//middleweares
app.use(morgan('dev'));

//Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routas
app.use(rutaAdmin);

export default app;
