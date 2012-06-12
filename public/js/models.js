// Square Model
// ------------

var Square = Backbone.Model.extend({
		
	// Default values.
	defaults: function() {
		return {
			//descrip: "",
			x: 100,
			y: 100,
			width: 200,
			height: 75,
			radius: 10
		};
	},

	/* initialize: function() {
		if (!this.get("label")) {
			this.set({"label": this.defaults.descrip});
			this.set({"square": this.defaults.square});
		}
	}, */

	snapped: function() {
		//something here Raphael.isBBoxIntersect(bbox1, bbox2)
	},

	clear: function () {
		this.destroy();
	}
});

// Square Collection
// -----------------

var SquareList = Backbone.Collection.extend({

	model: Square,

	connections: function () {
		//if one is connected, let's keep track of that
	}

});

//Create global collection of Squares.
var Squares = new SquareList;