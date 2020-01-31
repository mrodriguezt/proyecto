var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology: true});


var img_schema = new Schema({
	title:{type:String, required:true},
	creator:{type:Schema.Types.ObjectId, ref:"User"}
});

//primer parametro el nombre y segundo es el esquema
var Imagen = mongoose.model("Imagen",img_schema);

module.exports.Imagen =  Imagen;

