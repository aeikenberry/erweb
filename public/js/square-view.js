// ---------------- Square Item View ------
// ----------------------------------------

var SquareView = Backbone.View.extend({

    events: {	
	"click a.resize"    : "resize"
	},

   initialize: function() {

       	// every function that uses 'this' as the current object should be in here
  		_.bindAll(this, 'render', 'newSquare', 'addItemToView');
        	
    	this.element = p.rect();
       	this.el = this.element.node;
       	this.delegateEvents(this.events);
       	this.element.attr({
        	x: this.model.defaults.x,
        	y: this.model.defaults.y,
        	width: this.model.defaults.width,
        	height: this.model.defaults.height,
        	radius: this.model.defaults.radius,
        	stroke: "#222"
        });
    },

    click: function() {
    	alert('clicked')
    },

    render: function() {
    
       	this.element.attr({
       		x: this.model.defaults.x,
       		y: this.model.defaults.y,
       		width: this.model.defaults.width,
       		height: this.model.defaults.height,
       		radius: this.model.defaults.radius
       	});
       	return this;
    },

    newSquare: function () {
        new SquareView({model: this});
    }
});