import axios from "axios";


let variables = [];
export let routes =[];



const apiMonitores = 'http://192.168.1.89:8000/api/monitors/'
const apiIndicadores = 'http://192.168.1.89:8000/api/indexes/'



export const fetchRoutes = async () => {
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


export const fetchIndicators = async () => {
    try {
        const apiData = await axios.get(apiIndicadores);
        
        const data = apiData.data;
        return data
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

export const fetchImages = async (id) => {
    try{
        const apiData = await axios.get(apiMonitores + id + '/image/');
        let imgURL = apiData.data.image.image
        console.log(imgURL)
        imgURL = 'http://192.168.1.89:8000' + imgURL
        console.log(imgURL)
        return imgURL
    }
    catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

export const contact = (req, res) => {
  
    res.render('contact', { items: variables, title: 'Contact' });
};

export const errorPage = (req, res) => {
    res.status(404).render('error', {layout: 'error'});
}
