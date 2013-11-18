define(["backbone","handlebars","jquery","events"], function(Backbone, Handlebars, $, Events) {
	var EdicaoConcursoView = Backbone.View.extend({
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
		//			router.collection.fetch();
					Events.trigger("router:fetch");
					window.history.back();
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
					Events.trigger("router:navigate", "");
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
	return EdicaoConcursoView;
});
