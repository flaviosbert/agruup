require.config({
  //baseUrl: "/javascripts",
  paths: {
    jquery: "/javascripts/lib/jquery",
    backbone: "/javascripts/lib/backbone",
    underscore: "/javascripts/lib/underscore",
    handlebars: "/javascripts/lib/handlebars"
  },
  shim: {
	  underscore: {
	      exports: '_'
	    },
	    backbone: {
	    	deps: ["underscore", "jquery"],
	    	exports: 'Backbone'
	    },
	    handlebars: {
	    	exports: "Handlebars"
	    		}
	    }
  });

require(["init"]);