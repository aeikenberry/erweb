// The Application
// ---------------

// Top-level piece of UI
var AppView = Backbone.View.extend({

	el: $('body'),


	events: {
		"click a#newsquare": "addOne",
		//"click #header": "clicked"
	},

	initialize: function() {	
		//console.log('initialized');
		//console.log(this);
		
	},

	render: function() {

	},

	clicked: function() {
		alert("click");
	},
	addOne: function() {
		var view = new SquareView({model: Square});
		//console.log(this);
		this.$("#appcontainer").append(view.render().el);
		//alert("addOne triggered");
	}
});

// Create the App.
var App = new AppView;