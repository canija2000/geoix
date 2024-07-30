import express from 'express';
const router = express.Router();
import axios from 'axios';
import { home, contact, errorPage} from '../controllers/controllers.js';
import fs from 'fs';



router.get('/contact', contact);

const apiMonitores = 'http://192.168.1.89:8000/api/monitors/'
const apiIndicadores = 'http://192.168.1.89:8000/api/indexes/'

let routes = []

const fetchRoutes = async () => {
    try {
        const apiData = await axios.get(apiMonitores);
        const data = apiData.data;
        routes = data.map(route => ({
            id: route.id,
            name: route.name,
            path: route.name.replace(/\s/g, '').toLowerCase(),
            description: route.description
        }));
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};
const fetchIndicators = async () => {
    try {
        const apiData = await axios.get(apiIndicadores);
        const data = apiData.data;
        return data
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

// Ruta principal que muestra la lista de navegación
router.get('/', async (req, res) => {
    if (routes.length === 0) {
        await fetchRoutes(); // Asegurarse de que tengamos las rutas
    }
    res.render('home', { routes: routes, title: 'GeoIX' });
});



// Rutas dinámicas

router.get('/:route', async (req, res) => {
    if (routes.length === 0) {
        await fetchRoutes(); // Asegurarse de que tengamos las rutas
    }
    const route = req.params.route;
    const routeData = routes.find(r => r.path === route);

    //indicators
    const indicators = await fetchIndicators();
    const indicatorsData = indicators.filter(indicator => indicator.monitor === routeData.id);
    let iData = indicatorsData.map(indicator => ({
        id: indicator.id,
        name: indicator.name,
        description: indicator.description,
        route: `${routes.path}/${indicator.name.replace(/\s/g, '').toLowerCase()}`
    }));
    if (routeData) {
        res.render('ivariable', { routes: routes, title: routeData.name, name: routeData.name , description : routeData.description, indicators: iData });
    } else {
        res.render('error', { title: 'Error' });
    }
}
);

router.use('*', errorPage);


export default router;
