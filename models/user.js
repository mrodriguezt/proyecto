var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology: true});
/*
String
Number
Date
Buffer
Boolean
Mixed 
Objectid
Array
*/
var posibles_valores =["M","F"];
var password_validation = {
	validator: function(v){
		//deber retornar falso or trur
		return this.password_confirmation == v;
	},
	message:  "Las contraseñas no coinciden"	
}
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email Valido"];
var user_schema = new Schema({
	name: String,
	last_name: String,
	username: {type: String,required:true,maxlength:[50,"username muy grande"]},
	password: {type: String,required:true,minlength:[8,"El password es muy corto"],validate: password_validation},
	age: {type:Number, min:[5,"La edad no puede ser menor a 5"],max:[50,"La edad no puede ser mayor a 100"]},
	email: {type: String, required:"El correo es obligatorio",match:email_match},
	date_of_birth: Date,
	sex: {type:String,enum:{values:posibles_valores,message:"Opción no válida"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

/*
user_schema.virtual("full_name").get(function(){ //acceder la forma en que se accede al atributo
	return this.name + this.last_name;
}).set(function(full_name){
	//la forma en al q se asigna un valor al atributo y establecer la lógica con la que se asigna un valor
	var words = full_name.split(" ");
	this.name = words[0];
	this.last_name = words[1];


});
*/
//primer parametro el nombre y segundo es el esquema
var User = mongoose.model("User",user_schema);

module.exports.User =  User;


