import axios from "axios";


let variables = [];



export const home = async (req, res, ) => {
    try{
        const response = await axios.get('http://192.168.1.89:8000/api/indexes/');
        const data = response.data;
        variables = data.map(route => route.name);
        res.render('home', { items: variables, title: 'GeoIX' });
    }
    catch (error) {
        console.error('Error al obtener datos de la API:', error);
        res.render('error');
    }
}


export const contact = (req, res) => {
  
    res.render('contact', { items: variables, title: 'Contact' });
};

export const errorPage = (req, res) => {
    res.status(404).render('error', {layout: 'error'});
}
