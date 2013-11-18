define(["backbone"], function (Backbone) {
	var Concurso = Backbone.Model.extend({
		idAttribute: "_id",
		urlRoot: "/concursos"
		
	});
	
	return Concurso;
});
