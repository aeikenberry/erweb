	// Square Model
	// ------------

	var Shape = Backbone.Model.extend({
	    defaults: {
	        x: 50,
	        y: 50,
	        width: 150,
	        height: 150,
	        color: 'black'
	    },
	    setTopLeft: function(x, y) {
	        this.set({
	            x: x,
	            y: y
	        });
	    },
	    setDim: function(w, h) {
	        this.set({
	            width: w,
	            height: h
	        });
	    },
	});

	// Square Collection
	// -----------------

	var Document = Backbone.Collection.extend({
	    model: Shape
	});

var document = new Document();