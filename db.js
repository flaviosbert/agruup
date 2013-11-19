//var dbUrl = process.env.MONGOHQ_URL || "agruup";
//var collections = ["concursos"];
//
//var db = require("mongojs").connect(dbUrl, collections);
//
//module.exports = db;

var mysql = require('mysql');

var bancoLocal = {
		host: 'localhost',
		user: 'root',
		password: 'senha',
		database: 'agruup'		
	};

var db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL || bancoLocal); 

module.exports = db;