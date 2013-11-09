var Concurso = Backbone.Model.extend({
	idAttribute: "_id"
});

var ConcursoCollection = Backbone.Collection.extend({
	model: Concurso,
	url: '/concursos'
}); 

var ConcursoView = Backbone.View.extend({
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
		var id = this.model.get("_id");
		router.navigate("concurso/"+ id, {trigger: true}); 
	}
});

var ExibirConcursoView = Backbone.View.extend({
	render: function() {		
		var template = $("#exibirConcursoTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);		
		return this;
	}
});

var EditarConcursoView = Backbone.View.extend({
	events: {
		"click .gravarConcurso": "gravarConcursoLink",
		"change": "change"
			
	},
	render: function() {		
		var template = $("#editarConcursoTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);		
		return this;
	},
	gravarConcursoLink: function(e){
		e.preventDefault();
		var id = this.model.get("_id");
		console.log('gravarConcurso', id);
		this.model.save(null, {
			success: function(model){
				console.log("sucesso");
				window.router.navigate("", {trigger: true});
			},
			error: function(model, xhr, options){
				console.log("falha");
			}
		});
	},
	change: function(event){
		var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);        
	}
});

var ConcursoCollectionView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},
	tagName: "ul",
	className: "concursos",
	render: function() {
		this.$el.html("");
		this.collection.each(function(concurso) {
			var concursoView = new ConcursoView({model: concurso});
			this.$el.append(concursoView.render().el);
		}, this);
		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	initialize: function() {
		this._setupCollection();
	},
	routes: {
		"": "index",
		"concurso/:id": "editarConcurso"
	},
	_setupCollection: function() {
		if (this.collection) return;
		var data = $("#initialContent").html();
		this.collection = new ConcursoCollection(JSON.parse(data));	
	},
	_renderView: function(view) {
		$(".app").html(view.render().el);
	},
	index: function() {			
		var view = new ConcursoCollectionView({collection: this.collection});
		this._renderView(view);
	},
	editarConcurso: function(id) {		
		var concurso = this.collection.get(id);		
		var view = new EditarConcursoView({model: concurso});		
		this._renderView(view);
	}
});