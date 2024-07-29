import express from 'express'
import { engine } from 'express-handlebars' 
import path from 'path'
import routes from './routes/routes.js'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const PORT = 3000

// Set up Handlebars
app.engine('hbs', engine({ defaultLayout: 'main' , extname: 'hbs' }));
app.set('view engine', 'hbs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.json())
app.use('/bootstrap',express.static(path.join('node_modules/bootstrap/dist/css')))
app.use('/bootstrapjs',express.static(path.join('node_modules/bootstrap/dist/js')))
app.use('/public',express.static(path.join('public')))


app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

