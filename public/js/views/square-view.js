// ---------------- Square Item View ------
// ----------------------------------------

var SquareView = Backbone.View.extend({



    initialize: function() {

        this.element = [p.rect(), p.rect(), p.rect(), p.text()];
        //this.thing = p.rect();
        this.el = this.element.node;
        //console.log(this.element[1].node);
        //this.el = this.element[1].node;
        this.delegateEvents(this.events);

    },

    events: {       
        "click": "click"
    },

    click: function() {
        alert('clicked');
    },

    render: function() {
        var set = p.set();
		
       /* this.thing.attr({
            x: 30,
            y: 30,
            width: 200,
            height: 75,
            fill: '#363',
            stroke: "none",
            cursor: "move",
            opacity: .5
        });*/

		this.element[0].attr({
        	x: 30,
        	y: 30,
        	width: 200,
        	height: 75,
        	fill: '#363',
            stroke: "none",
            cursor: "move",
            opacity: .5
                        
        });

        this.element[1].attr({
            x: 30,
            y: 105,
            width: 200,
            height: 75,
            fill: '#343',
            stroke: "none",
            cursor: "move",
            opacity: .5
        });

        this.element[2].attr({
            x: 30,
            y: 180,
            width: 200,
            height: 75,
            fill: '#666',
            stroke: "none",
            cursor: "move",
            opacity: .5
        });

        this.element[3].attr({
            x: 60,
            y: 60,
            text: "Title",
            "font-size": 16,
            "font-weight": "bold"   
        });

        set.push(this.element[0], this.element[1], this.element[2], this.element[3]);
        set.id = i;
		i = i + 1;
                
        group.push(set);
        console.log(group.length);
        
        console.log(this.element[1].node);

        var ox = 0;
        var oy = 0;
        var dragging = false;
        this.element[1].dblclick(function() {
            alert('double clicked');
        });        
        set.mousedown(function(event) {
            set.toFront();
            ox = event.screenX;
            oy = event.screenY;
            set.attr({
                opacity: .25
            });
            dragging = true;
        });

        set.mousemove(function(event) {
            if (dragging) {
                set.translate(event.screenX - ox, event.screenY - oy);
                ox = event.screenX;
                oy = event.screenY;
                for (var i = connections.length; i--;) {
                    p.connection(connections[i]);
                }
                p.safari();
            };
        });

        set.mouseup(function(event) {
            dragging = false;
            set.attr({opacity: .5});
        });

		Raphael.fn.connection = function (obj1, obj2, line, bg) {
			if (obj1.line && obj1.from && obj1.to) {
				line = obj1;
				obj1 = line.from;
				obj2 = line.to;
			}
			var bb1 = obj1.getBBox(),
				bb2 = obj2.getBBox(),
				p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
				{x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
				{x: bb1.x - 1, y: bb1.y + bb1.height / 2},
				{x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
				{x: bb2.x + bb2.width / 2, y: bb2.y - 1},
				{x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
				{x: bb2.x - 1, y: bb2.y + bb2.height / 2},
				{x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
				d = {}, dis = [];
			for (var i = 0; i < 4; i++) {
				for (var j = 4; j < 8; j++) {
				    var dx = Math.abs(p[i].x - p[j].x),
				        dy = Math.abs(p[i].y - p[j].y);
				    if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
				        dis.push(dx + dy);
				        d[dis[dis.length - 1]] = [i, j];
				    }
				}
			}
			if (dis.length == 0) {
				var res = [0, 4];
			} else {
				res = d[Math.min.apply(Math, dis)];
			}
			var x1 = p[res[0]].x,
				y1 = p[res[0]].y,
				x4 = p[res[1]].x,
				y4 = p[res[1]].y;
			dx = Math.max(Math.abs(x1 - x4) / 2, 10);
			dy = Math.max(Math.abs(y1 - y4) / 2, 10);
			var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
				y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
				x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
				y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
			var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
			if (line && line.line) {
				line.bg && line.bg.attr({path: path});
				line.line.attr({path: path});
			} else {
				var color = typeof line == "string" ? line : "#000";
				return {
				    bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
				    line: this.path(path).attr({stroke: color, fill: "none"}),
				    from: obj1,
				    to: obj2
				};
			}
		};
				
        var connections = [];
		if (group.length == 2) {
			connections.push(p.connection(group[0], group[1], "#000", "#333"));

		}
		if (group.length == 4) {
            connections.push(p.connection(group[2], group[3], "#000", "#333"));
        }		
    return this;
    }
});