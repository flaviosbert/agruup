$(function() {
	
	var collection = new ConcursoCollection();
	collection.fetch({
		success: function(data) {
			var view = new ConcursoCollectionView({collection: data});
			$("body").append(view.render().el);
		}
	});
		
});