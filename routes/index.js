
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "Express" });
};



var db = require("../db.js");

exports.concursos = {};

exports.concursos.all = function(req, res) {
	db.concursos.find({}, function(err, obj) {		
		res.json(obj);

	});
};

exports.concursos.one = function(req, res) {
	var id = db.ObjectId(req.params.id);
	
	db.concursos.find({_id: id}, function(err, obj) {
		if (err) throw err;
		
		res.json(obj);
	});
	
};

exports.concursos.create = function(req, res) {
	var concurso = {};
	concurso.nome = req.body.nome;
	db.concursos.save(concurso, function(err, obj) {
		if (err) throw err;		
	});
	res.json(req.body);
};