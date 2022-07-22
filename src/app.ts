import express from "express";
import morgan from "morgan";
import rutaLlamadas from "./routes/rutas-llamadas";
import rutaEntradas from "./routes/rutas-entradas";

const app = express();

//Middleweares
app.use(morgan("dev"));

//Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas
app.use(rutaLlamadas, rutaEntradas);

export default app;
