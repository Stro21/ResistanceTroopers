var express = require("express");
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
var server = http.createServer();
var expressJWT = require("express-jwt");
var port = 8000;

//MIS ARCHIVOS
var api = require('./routes/controllers/api'); 
var key = require("./functions/key").key();

//configurar app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressJWT({secret: key}).unless({path: ['/login', '/usuarios/ingresar']}));
app.use(api.validar_token);

//******************************LLAMADAS***********************************************************************

//escuchando en puerto
app.listen(port, api.escuchando(port));
//pagina inicial
app.get("/usuarios/main", api.main);
//obtener usuario por id
app.get("/usuarios/:id", api.obtener_usuario_por_id);
//obtener todos los usuarios api.obtener_usuarios
app.get("/usuarios", api.obtener_usuarios);
//obtener usuario por cuenta
app.get("/usuarios/cuenta/:usuario", api.obtener_usuario_por_cuenta);
//ingresar nuevo usuario forma
app.post("/usuarios/ingresar", api.ingresar_nuevo_usuario);
//borrar todos los usuarios
app.delete("/usuarios/vaciar", api.borrar_todos_los_usuarios);
//borrar usuario por id
app.delete("/usuarios/:id", api.borrar_usuario_por_id);
//modificar usuario por id
app.put("/usuarios/:id", api.modificar_usario_por_id);
//login
app.post("/login", api.login);