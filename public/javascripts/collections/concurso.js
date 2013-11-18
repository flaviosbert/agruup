define(["backbone","models/concurso"], function(Backbone, Concurso) {
	var ConcursoCollection = Backbone.Collection.extend({
		model: Concurso,
		url: '/concursos'
	});
	
	return ConcursoCollection;
});
 