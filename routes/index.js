var db = require("../db.js");

exports.index = function(req, res){
	res.send(process.env.CLEARDB_DATABASE_URL);
	return;
	
	
	var stringSQL = "select * from concursos;";
	db.query(stringSQL, function(err, rows) {
		if (err) {
			throw err;
		}
		
		if (!rows) {
			res.json("{}");
		}
		
		var ret = [];
		
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			
			var linha = concursoToObj(row);			
			ret.push(linha);			
		}		
		
		var data = JSON.stringify(ret);		
		res.render('index', { title: "Lista de Concursos", appData: data });
		
	});
	
	
	
//	db.concursos.find({}, function(err, obj) {
//		var data = JSON.stringify(obj);		
//		res.render('index', { title: "Lista de Concursos", appData: data });
//	});	
};

exports.concursos = {};

exports.concursos.all = function(req, res) {
	var stringSQL = "select * from concursos;";
	db.query(stringSQL, function(err, rows) {
		if (err) {
			throw err;
		}
		
		if (!rows) {
			res.json("{}");
		}
		
		var ret = [];
		
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			
			var linha = concursoToObj(row);			
			ret.push(linha);			
		}		
		
		res.json(ret);
	});
	
//	
//	db.concursos.find({}, function(err, obj) {		
//		res.json(obj);
//
//	});
};

exports.concursos.one = function(req, res) {
	var id = req.params.id;
	var stringSQL = "select * from concursos where idconcurso=?";
	
	db.query(stringSQL, id, function(err, rows) {
		if (err) throw err;		
		if (!rows) throw new Error("Concurso nao encontrado"); 
		
		var obj = concursoToObj(rows[0]);
		
		res.json(obj);
	});
	
//	db.concursos.find({_id: id}, function(err, obj) {
//		if (err) throw err;
//		
//		res.json(obj);
//	});
	
};

exports.concursos.create = function(req, res) {
	var concurso = {};
	concurso.nome = req.body.nome;
	concurso.descricao = req.body.descricao;
	concurso.salario = req.body.salario;
	
	var stringSQL = "INSERT INTO concursos SET ?";
	var query = db.query(stringSQL, concurso, function(err, result) {
		if (err) throw err;
		
		concurso.id = result.insertId;
		res.json(concurso);		
	});
	
//	db.concursos.save(concurso, function(err, obj) {
//		if (err) throw err;		
//	});
//	res.json(req.body);
};

exports.concursos.change = function(req, res) {
	var id = req.params.id;
	
	var concurso = req.body;
	delete concurso.id;
	
	var stringSQL = "UPDATE concursos SET ? WHERE IDCONCURSO=?";
	var query = db.query(stringSQL, [concurso, id], function(err, result) {
		if (err) throw err;
		
		res.json(req.body);
	});
	
//	db.concursos.update({"_id": id }, concurso, function(err, obj) {
//		if (err) throw err;
//		res.json(req.body);
//	});
	
};

exports.concursos.remove = function(req, res) {
	var id = req.params.id;
	var stringSQL = "DELETE FROM concursos WHERE idconcurso=?";
	db.query(stringSQL, id, function(err, result) {
		if (err) throw err;
		res.json('{ok:true}');		
	});
	
//	db.concursos.remove({"_id": id }, function(err, obj) {
//		if (err) throw err;
//		res.json('{ok:true}');
//	});	
};

var concursoToObj = function(linha) {
	var obj = {};
	obj.id = linha.idconcurso;
	obj.nome = linha.nome;
	obj.descricao = linha.descricao;
	obj.salario = linha.salario;	
	return obj;
};