const express=  require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');
const { allowedNodeEnvironmentFlags } = require('process');

//inicio
const app=express();

//configuraciones
app.set('port', process.env.PORT || 2000);
app.set('views' ,path.join(__dirname, 'views'));

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','hbs');


//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extends:false}));
app.use(express.json());

//variables globales 

app.use((req,res,next)=>{
    next();
})

//rutas
app.use(require('./routes'));
app.use('/tienda',require('./routes/tienda'));

//public
app.unsubscribe(express.static(path.join(__dirname, 'public'))); 


//inicia el servidor
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});
