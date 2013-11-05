var Concurso = Backbone.Model.extend({
	idAtttribute: "_id"
});

var ConcursoCollection = Backbone.Collection.extend({
	model: Concurso,
	url: '/concursos'
}); 

var ConcursoView = Backbone.View.extend({
	tagName: "li",
	className: "concurso",
	render: function() {
		var template = $("#concursoTemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});

var ConcursoCollectionView = Backbone.View.extend({
	tagName: "ul",
	className: "concursos",
	render: function() {
		this.collection.each(function(concurso) {
			var concursoView = new ConcursoView({model: concurso});
			this.$el.append(concursoView.render().el);
		}, this);
		return this;
	}
});