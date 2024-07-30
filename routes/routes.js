import express from 'express';
const router = express.Router();
import axios from 'axios';
import { fetchImages, fetchIndicators, fetchRoutes, contact, errorPage, routes} from '../controllers/controllers.js';
import fs from 'fs';


router.get('/contact', contact);

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
    const monitorData = routes.find(r => r.path === route);

    //indicators
    const indicators = await fetchIndicators();
    const monitorIMG = await fetchImages(monitorData.id);
    const indicatorsData = indicators.filter(indicator => indicator.monitor === monitorData.id);
    if (monitorData) {
        res.render('ivariable', { 
            routes: routes,
            title: monitorData.name,
            name: monitorData.name , 
            description : monitorData.description, 
            indicators: indicatorsData,
            img: monitorIMG});
    } else {
        res.render('error', { title: 'Error' });
    }
}
);

router.use('*', errorPage);


export default router;
