//Importar o modulo do express
var express = require("express");

//Importar o modulo congign
var consign = require("consign");

//Importar o modulo bodyparser
var bodyParser = require("body-parser");

//Importar o modulo express validation
var expressValidator = require("express-validator");

//Iniciar o objeto express
var app = express();

//setar as variaveis 'view engine' e variavel 'views' do express
app.set("view engine", "ejs");
app.set("views", "./app/views");

//Configurar o middleware express.static
app.use(express.static("./app/public"));

//Configurar o middleware bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Configura o middleware do express validator
app.use(expressValidator());

//Configura o congign para auto load das rotas, controles e modelos
consign()
  .include("app/routes")
  .then("app/models")
  .then("app/controllers")
  .into(app);

//Exportar o objeto express
module.exports = app;
