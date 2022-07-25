//importa librerias//crea puerto para que el server escuche peticiones//ejexuta express
const express = require('express');
const app = express();
require('dotenv').config();
const Port=process.env.PORT ||8080;
const hbs=require('hbs');
const mysql=require('mysql2');
const path=require('path');
const nodemailer=require('nodemailer');
const async=require('hbs/lib/async');
const { get }=require('express/lib/response');
const res = require('express/lib/response');
const { error } = require('console');
const req = require('express/lib/request');
const { domainToASCII } = require('url');
//conectar app a DB
const conexion = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    port:process.env.PORTDB,
    database:process.env.DATABASE
});
//conecta DB
/*
const conectar = (conexion.connect((error)=>{
        if (error) throw error;
        console.log('DB conectada');
    })
);
*/

//configura middelwares(funciones que pasan por datos ingresantes, van antes que verbos http)
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:false}));


//configuracion de vistas
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));
hbs.registerPartials(path.join(__dirname,'views/partials'));

//recursos para cliente con verbos http,app.get(function,(req,res), renderiza las paginas
app.get('/', (req,res)=>{
    res.render('index',{titulo:'Pagina principal'})
});
app.get('/productos',(req,res)=>{
    res.render('productos',)
});

app.get('/contacto',(req,res)=>{
res.render("contacto",)
});
app.get('/quehacemos',(req,res)=>{
res.render('quehacemos',)
});
app.get('/articulos',(req,res)=>{
res.render("articulos")
});
app.get('/formulario',(req,res)=>{
    res.render("formulario")
});
//verbo post para recibir datos
app.post('/formulario',(req,res)=>{
 //desestructuracion del post

const {nombre,producto,descripcion}=req.body;
if (nombre =="" || producto =="" ||descripcion ==""){
    let validacion="faltan datos"
    res.render('formulario',{
        validacion
    })
}else{
    console.log(nombre);
    console.log(producto);
    console.log(descripcion);

    let data= {
        nombre_consulta: nombre,
        producto_consulta: producto,
        descripcion_consulta: descripcion
    }
    let sql ="INSERT INTO SOLICITUD SET ?";
    let query = conexion.query(sql,data,(err,results)=>{
       if (err) throw err;
       res.render("index");
    });
}
});

 //absorbe los datos recibidos y los inserta a una tabla
 
//pone el server a la escucha de requests
app.listen(Port,()=>{
    console.log(`servidor corriendo en el puerto ${Port}`);
});

app.on('error',(error)=>{
    console.log(`hay un error &{error}`);
});

