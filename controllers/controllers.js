import axios from "axios";


let variables = [];
let routes =[];


export const home = async (req, res, ) => {
    try{
        const response = await axios.get('http://192.168.1.89:8000/api/indexes/');
        const data = response.data;
        variables = data.map(route => route.name);
        routes = data.map(route => {
            let trimmed = route.name
            trimmed = trimmed.replace(/\s/g, '');            
            return trimmed;
        });

        const final = variables.map((variable,index)=> {
            return {
                name : variable,
                route : routes[index]
        }})
    
        res.render('home', { final : final , title: 'GeoIX' });
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
