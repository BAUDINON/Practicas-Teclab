import express from 'express';
import cors from 'cors';
import unidadAlquilableRutas from './rutas/unidad-alquilable.rutas.js';
import precioRutas from './rutas/precio.rutas.js';
import reservaRutas from './rutas/reserva.rutas.js';
import disponibilidadRutas from './rutas/disponibilidad.rutas.js';



const app = express();

app.use(cors());

app.use(express.json());

app.use(unidadAlquilableRutas,precioRutas,reservaRutas,disponibilidadRutas);


export default app;