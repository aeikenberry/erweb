var ShapeView = Backbone.View.extend({
    initialize: function() {
        $('#page').mousemove(this, this.mousemove).mouseup(this, this.mouseup);
        this.model.bind('change', this.updateView, this);
    },
    
    render: function() {
        $('#page').append(this.el);
        $(this.el).html('<div class="shape"/>' + '<div class="control delete hide"/>' + '<div class="control change-color hide"/>' + '<div class="control resize hide"/>').css({
            position: 'absolute',
            padding: '10px'
        });
        this.updateView();
        return this;
    },
    
    updateView: function() {
        $(this.el).css({
            left: this.model.get('x'),
            top: this.model.get('y'),
            width: this.model.get('width') - 10,
            height: this.model.get('height') - 10
        });
        this.$('.shape').css({
            background: this.model.get('color')
        });
    },
    events: {
        'mouseenter .shape': 'hoveringStart',
        'mouseleave': 'hoveringEnd',
        'mousedown .shape': 'draggingStart',
        'mousedown .resize': 'resizingStart',
        'mousedown .change-color': 'changeColor',
        'mousedown .delete': 'deleting',
    },
    hoveringStart: function() {
        this.$('.control').removeClass('hide');
    },
    hoveringEnd: function() {
        this.$('.control').addClass('hide');
    },
    draggingStart: function(e) {
        this.dragging = true;
        this.initialX = e.pageX - this.model.get('x');
        this.initialY = e.pageY - this.model.get('y');
        return false; // prevents text selection
    },
    resizingStart: function() {
        this.resizing = true;
        return false;
    },
    changeColor: function() {
        this.model.set({
            color: prompt('Enter color value', this.model.get('color'))
        });
    },
    deleting: function() {
        this.model.collection.remove(this.model);
    },
    mouseup: function(e) {
        if (!e.data) return;
        var self = e.data;
        self.dragging = self.resizing = false;
    },
    mousemove: function(e) {
        if (!e.data) return;
        var self = e.data;
        if (self.dragging) {
            self.model.setTopLeft(e.pageX - self.initialX, e.pageY - self.initialY);
        } else if (self.resizing) {
            self.model.setDim(e.pageX - self.model.get('x'), e.pageY - self.model.get('y'));
        }
    }
});