import express from 'express';
import morgan from 'morgan';
import rutaAdmin from './routes/rutas-llamadas';

const app = express();

//Middleweares
app.use(morgan('dev'));

//Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas
app.use(rutaAdmin);

export default app;
