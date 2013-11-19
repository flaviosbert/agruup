define(["backbone","handlebars","jquery","events"], function(Backbone, Handlebars, $, Events) {
	var ConcursoItemListaView = Backbone.View.extend({
		initialize: function() {
			this.model.bind("destroy", this.close, this);
		},
		events: {
			"click .nomeConcurso": "nomeConcursoLink"		
		},
		tagName: "li",
		className: "concurso",
		render: function() {
			var template = $("#concursoTemplate").html();
			var compiled = Handlebars.compile(template);
			var html = compiled(this.model.attributes);
			this.$el.html(html);
			return this;
		},
		nomeConcursoLink: function(e) {
			e.preventDefault();
			var id = this.model.get("id");
			var url = "concurso/exibir/"+ id;
			Events.trigger("router:navigate", url);			 
		}	
	});
	
	return ConcursoItemListaView;
});
