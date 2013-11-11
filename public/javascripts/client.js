var Concurso = Backbone.Model.extend({
	idAttribute: "_id",
	urlRoot: "/concursos"
	
});

var ConcursoCollection = Backbone.Collection.extend({
	model: Concurso,
	url: '/concursos'
}); 

var ConcursoView = Backbone.View.extend({
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
		"click .removerConcurso": "removerConcursoLink",		
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
			
		this.model.save(null, {
			success: function(model){			
				//router.collection.fetch();
				window.router.navigate("", {trigger: true});
			},
			error: function(model, xhr, options){		
				alert('erro na gravação');
			}
		});	
	},
	removerConcursoLink: function(e) {
		e.preventDefault();	
		this.model.destroy({
			success: function () {
				window.router.navigate("", {trigger: true});
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
			var concursoView = new ConcursoView({model: concurso});
			this.$el.append(concursoView.render().el);
		}, this);
		var template = $("#footerTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled();
		this.$el.append(html);		
		
		return this;
	},
	addConcursoLink: function(e){
		e.preventDefault();
		window.router.navigate("concurso/add", {trigger: true});		
	}	
});

var AppRouter = Backbone.Router.extend({
	initialize: function() {
		this._setupCollection();
	},
	routes: {
		"": "index",		
		"concurso/add": "inserirConcurso",
		"concurso/:id": "editarConcurso"
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
	},
	editarConcurso: function(id) {		
		var concurso = this.collection.get(id);		
		var view = new EditarConcursoView({model: concurso});		
		this._renderView(view, ".edicao");
	},
	inserirConcurso: function() {
		var concurso = new Concurso();
		var view = new EditarConcursoView({model: concurso});		
		this._renderView(view, ".edicao");
	}
});