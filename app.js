var express = require("express");
var pug = require('pug');
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var methodOverride= require("method-override")
//var session = require("express-session");
var routes = require("./routes");
var app = express();
var session_middleware = require("./middlewares/session");

// UN ESQUEMA CORRESPONDE COLLECTIONS => TABLAS
//DOCUMENTOS => FILAS

//para crear middleware
app.use('/public',express.static('public'));
app.use('/puclic',express.static('assets'));
app.use(bodyParser.json());//peticiones json
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"))
//true para que acepten arreglos
/*app.use(session({
	secret: "123hjabdhjabdjadaihdiau",	
	resave: false,	
	saveUninitialized: false,

}));*/

app.use(cookieSession({
	name: "session",
	keys: ["llave-1","llave-2"]

}));
/* /app/usuarios */

/* /app*/


app.set("view engine","pug");

app.get("/",function(req,res){
	console.log(req.session.user_id);
	res.render("index")
});

app.post("/sessions",function(req,res){
	//User.findById("5e306830ec357bc3a86562cd",function(err,docs){})
	User.findOne({email:req.body.email,password:req.body.password},"username email",function(err,user){
		req.session.user_id=user._id;
		console.log(user);

		res.redirect("/app");
	});
});

app.post("/users",function(req,res){
	var user = new User({email:req.body.email,
			username:req.body.username,
			password:req.body.password,
			password_confirmation:req.body.password_confirmation});
	//promises sobre todas los queries
	user.save().then(function(us){
		res.send("Guardamos el usuario existosamente")
	},function(err){
		if(err){
			console.log(String(err));
			res.send("No se pudo guardar la información");	
		}
	});

	/*user.save(function(err,user,numero){
		if(err){
			console.log(String(err));

		}
		res.send("Recibimos tus datos");	
	});*/
	console.log("Confirmacion Contraseña :" + user.password_confirmation);
	console.log("Email:" + req.body.email);
	console.log("Contraseña:" + req.body.password);
});

app.get("/signup",function(req,res){

	User.find(function(err,doc){
		console.log(doc);
		res.render("singup")	;
	})
	
});
app.get("/login",function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("login")	;
	})
	
});
app.use("/app",session_middleware);
app.use("/app",routes);
app.listen(8080);