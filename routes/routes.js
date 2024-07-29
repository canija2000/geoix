import express from 'express';
const router = express.Router();
import axios from 'axios';
import { home, contact, errorPage} from '../controllers/controllers.js';
import fs from 'fs';


router.get('/', home);
router.get('/contact', contact);




const api = 'http://192.168.1.89:8000/api/indexes/'
const api2 = 'http://192.168.1.89:8000/api/indexes/1/timeseries/'

const getData = async (api) => {
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

const initRoutes = async () => {
    const variables = [];
    try {
        // Obtener datos de la API
        const response = await axios.get(api);
        const data = response.data;
        // Definir rutas dinámicamente
        const variables = data.map(route => route.name);
        data.forEach((route) => {
          router.get(`/${route.name}`, async (req, res) => {
            const data = await getData(api2);
            res.render('ivariable', { data: JSON.stringify(data) , name: route.name, items: variables, title: `GeoIX ${route.name}` });
          });
        });
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };


// Inicializar rutas dinámicas
initRoutes().then(() => {
    // Manejador de errores después de inicializar rutas dinámicas
    router.use('*', errorPage);
});

export default router;
