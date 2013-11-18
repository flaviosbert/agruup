define(["backbone", "events", "models/concurso","collections/concurso", "views/concurso/edicao", "views/concurso/exibicao", "views/concurso/lista"], 
		function(Backbone, Events, Concurso, ConcursoCollection, EdicaoConcursoView, ExibicaoConcursoView, ConcursoCollectionView) {

	var Router = Backbone.Router.extend({
		initialize: function() {
			var self = this;
			this._setupCollection();
			Events.on("router:navigate", function(url) {
				self.navigate(url, {trigger: true});
			});
			Events.on("router:fetch", function() {
				self.collection.fetch();
			});
		},
		routes: {
			"": "index",		
			"concurso/add": "inserirConcurso",
			"concurso/exibir/:id": "exibirConcurso",
			"concurso/editar/:id": "editarConcurso"
		},
		_setupCollection: function() {
			if (this.collection) return;
			var data = $("#initialContent").html();
			this.collection = new ConcursoCollection(JSON.parse(data));	
		},
		_renderView: function(view, div) {
			if (!div) div = ".app";
			//$(".app").html(view.render().el);
			$(div).html(view.render().el);
		},
		_clearDiv: function(div){
			$(div).html("");
		},
		index: function() {			
			var view = new ConcursoCollectionView({collection: this.collection});
			this._renderView(view);
			this._clearDiv(".edicao");
			document.title = "Lista de Concursos";
		},
		exibirConcurso: function(id) {
			var concurso = this.collection.get(id);		
			var view = new ExibicaoConcursoView({model: concurso});		
			this._renderView(view, ".app");
			document.title = "Exibir Concurso"; 
		},
		editarConcurso: function(id) {		
			var concurso = this.collection.get(id);		
			var view = new EdicaoConcursoView({model: concurso});		
			this._renderView(view, ".app");
		},
		inserirConcurso: function() {
			var concurso = new Concurso();
			var view = new EdicaoConcursoView({model: concurso});		
			this._renderView(view, ".edicao");
		}
	});
	
	return Router;	
});
