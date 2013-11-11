var db = require("../db.js");

exports.index = function(req, res){
	db.concursos.find({}, function(err, obj) {
		var data = JSON.stringify(obj);		
		res.render('index', { title: "Lista de Concursos", appData: data });
	});	
};

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
	concurso.descricao = req.body.descricao;
	concurso.salario = req.body.salario;
	db.concursos.save(concurso, function(err, obj) {
		if (err) throw err;		
	});
	res.json(req.body);
};

exports.concursos.change = function(req, res) {
	var id = db.ObjectId(req.params.id);
	
	var concurso = req.body;
	delete concurso._id;
	
	db.concursos.update({"_id": id }, concurso, function(err, obj) {
		if (err) throw err;
		res.json(req.body);
	});
	
};

exports.concursos.remove = function(req, res) {
	var id = db.ObjectId(req.params.id);
	
	db.concursos.remove({"_id": id }, function(err, obj) {
		if (err) throw err;
		res.json('{ok:true}');
	});
	
};