$(function(){

	// Square Model
	// ------------

	var Square = Backbone.Model.extend({
		
		// Default values.
		defaults: function() {
			// var r = paper.rect(40, 40, 50, 50, 10);
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

	// Square Item View
	// ----------------

	var SquareView = Backbone.View.extend({

		//tagName: "rect",

		//template: _.template($('#item-template').html()),

		events: {
			//some stuff here like
			"click a.resize"    : "resize",
		},

        // The SquareView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Square** and a **SquareView** in this
        // app, we set a direct reference on the model for convenience.

        initialize: function() {
        	
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

	// The Application
	// ---------------

	// Top-level piece of UI
	var AppView = Backbone.View.extend({

		el: $("#appcontainer"),


		events: {
			"click #newsquare": "addOne"
		},

		initialize: function()
		{
			this.button = this.$('#newsquare');
			
			var p = Raphael(0, 0, "100%", "100%");

			$('el').append(p);
			var start = function () {
        		this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        		this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        		},

        	move = function (dx, dy) {
            	var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
            	this.attr(att);
        		},

        	up = function () {
            	this.animate({"fill-opacity": 100}, 0, ">");
        		}

        	// A list of objects on the screen  
        	things = [
            	p.rect(50, 150, 200, 150).attr({"fill": "#fff", "stroke": "#000", opacity: 1, cursor: "move"}),
            	p.circle(400, 240, 100).attr({"fill": "red", "stroke": "none", opacity: .5, cursor: "move"}),
            	p.circle(650, 240, 100).attr({"fill": "green", "stroke": "none", opacity: .5, cursor: "move"})
        	]
    
    		p.set(things).drag(move, start, up);
			this.footer = this.$('footer');
			this.main = $('#main');

			Squares.fetch();
		},

		render: function() {
			$("#appcontainer")


			//re-render something at the app level
			//if (Square.length) {
			//	this.main.show()};
			// something like that
		},

		addOne: function() {
			var view = new SquareView({model: square});
			this.$("#appcontainer").append(view.render().el);
			alert("addOne triggered");
		}


	});

	// Create the App.
	var App = new AppView;

});