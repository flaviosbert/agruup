define(["backbone","jquery","events","views/concurso/itemLista"], 
		function(Backbone, $, Events, ConcursoItemListaView) {
	
	var ConcursoCollectionView = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			this.collection.bind('add', this.render);
			this.collection.bind('remove', this.render);
			this.listenTo(this.collection, "reset", this.render);
		},
		events: {		
			"click .addConcurso": "addConcursoLink"
		},
		tagName: "ul",
		className: "concursos",
		render: function() {
			this.$el.html("");
			this.collection.each(function(concurso) {
				var concursoItemListaView = new ConcursoItemListaView({model: concurso});
				this.$el.append(concursoItemListaView.render().el);
			}, this);
			var template = $("#footerTemplate").html();
			var compiled = Handlebars.compile(template);
			var html = compiled();
			this.$el.append(html);		
			
			return this;
		},
		addConcursoLink: function(e){
			e.preventDefault();
			var url = "concurso/add";
			Events.trigger("router:navigate", url);					
		}	
	});
	
	return ConcursoCollectionView;
});
