define(["backbone","handlebars","jquery","events"], function(Backbone, Handlebars, $, Events) {
	var ExibicaoConcursoView = Backbone.View.extend({
		events: {
			"click .editarConcurso": "editarConcursoLink"
		},
		render: function() {		
			var template = $("#exibirConcursoTemplate").html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model.attributes);
			this.$el.html(html);		
			return this;
		},
		editarConcursoLink: function(e) {
			e.preventDefault();
			var id = this.model.get("_id");
			var url = "concurso/editar/"+ id;
			Events.trigger("router:navigate", url);
		}
	});
	return ExibicaoConcursoView;
});
