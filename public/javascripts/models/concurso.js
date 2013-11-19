define(["backbone"], function (Backbone) {
	var Concurso = Backbone.Model.extend({
		//idAttribute: "idconcurso",
		urlRoot: "/concursos"
		
	});
	
	return Concurso;
});
