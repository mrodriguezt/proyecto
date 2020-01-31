var Imagen = require("../models/imagen").Imagen;

module.exports = function(req,res,next){
	Imagen.findById(req.params.id,function(err,imagen){			
		if(imagen != null){
			console.log("Encontré la imagen"+imagen.title);
			 res.locals.imagen = imagen;
			 next();
		}else{
			res.redirect("/app");
		}

	});
}