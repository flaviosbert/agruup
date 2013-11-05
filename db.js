var dbUrl = process.env.MONGOHQ_URL || "agruup";
var collections = ["concursos"];

var db = require("mongojs").connect(dbUrl, collections);

module.exports = db;