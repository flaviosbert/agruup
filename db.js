var dbUrl = "agruup";
var collections = ["concursos"];

var db = require("mongojs").connect(dbUrl, collections);

module.exports = db;