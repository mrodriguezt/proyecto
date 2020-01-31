var express = require("express");
var Imagen = require("./models/imagen").Imagen;
var router = express.Router();
var imageFinderMiddleware = require("./middlewares/find_image");
/*
app.com/app/
*/
router.get("/",function(req,res){
	res.render("app/home")

});

/* REST */
/* CRUD */
router.get("/imagenes/new",function(req,res){
	res.render("app/imagenes/new")

})

router.all("/imagenes/:id*",imageFinderMiddleware);

router.get("/imagenes/:id/edit",function(req,res){
	res.render("app/imagenes/edit",{imagen:res.locals.imagen});	
})


router.route("/imagenes/:id")
	.get(function(req,res){		
		res.render("app/imagenes/show",{imagen:res.locals.imagen})		
		
	})
	.put(function(req,res){	 
		imagen = res.locals.imagen;
		imagen.title = req.body.title;
		imagen.save(function(err){
 		if(!err){
	 			res.render("app/imagenes/show",{imagen:res.locals.imagen});
	 		}else{
	 			res.render("app/imagenes/"+imagen._id+"/edit",{imagen:imagen});
	 		}
	 	})
	})
	.delete(function(req,res){
	 	//eliminar imagenes	 	
	 	Imagen.findOneAndDelete({_id: req.params.id},function(err){
			if(!err){
				res.redirect("/app/imagenes/");
			}else{
				console.log(err);
				res.redirect("/app/imagenes/"+req.params.id);
			}
		});	
	})

router.route("/imagenes/")
	.get(function(req,res){
		Imagen.find({},function(err,imagenes){
			if(err){res.redirect("/app");return;}
			res.render("app/imagenes/index",{imagenes: imagenes});
		})

	})
	.post(function(req,res){
		console.log(res.locals.user._id);
	 	var data = {
	 		title:req.body.title,
	 		creator: res.locals.user._id

	 	}
	 	var imagen = new Imagen(data);
	 	imagen.save(function(err){
	 		if(!err){
	 			console.log(imagen);
	 			res.redirect("/app/imagenes/"+imagen._id);
	 		}else{
	 			console.log(imagen);
	 			res.render(err);
	 		}
	 	})

	})

module.exports = router;