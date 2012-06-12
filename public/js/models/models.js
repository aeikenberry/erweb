	// Square Model
	// ------------

	var Square = Backbone.Model.extend({
		
		// Default values.
		defaults:  {
			// var r = paper.rect(40, 40, 50, 50, 10);
			// the app view should create a paper object p = Raphael( thing)
			xPos: 100,
			yPos: 100
		}
	});

	// Square Collection
	// -----------------

	// Using *localStorage* instead of server storage

	var SquareList = Backbone.Collection.extend({

		model: Square,

		localStorage: new Store("squares-backbone"),

		connections: function () {
			//if one is connected, let's keep track of that
		}

	});

	//Create global collection of Squares.
	var Squares = new SquareList;