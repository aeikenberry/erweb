$(function() {
var Shape = Backbone.Model.extend({
    defaults: { x:100, 
                y:100, 
                width:180, 
                height:250, 
                color:'#fff', 
                opacity:'.7', 
                title:'Add a Title...' 
            },

    setTopLeft: function(x,y) { 
        this.set({ x:x, y:y }); 
    },
    setDim: function(w,h) { 
        this.set({ width:w, height:h }); 
    },
    initialize: function() {
        this.set({keys: new Array(), columns: new Array()});
    }

});

var Document = Backbone.Collection.extend({ model: Shape });

var DocumentView =  Backbone.View.extend({
    id: 'page',
    views: {},
    initialize: function() {
        this.collection.bind('add', function(model) {
            this.views[model.cid] = new ShapeView({ model: model, id:'view_' + model.cid }).render();
        }, this);
        this.collection.bind('remove', function(model) { 
            this.views[model.cid].remove();
            delete this.views[model.cid];
        }, this);
    },

    render: function() {
        return this;
    }
});

var ShapeView = Backbone.View.extend({ 
    initialize: function() {
        $('#page').mousemove(this, this.mousemove).mouseup(this, this.mouseup);
        this.model.bind('change', this.updateView, this);
    },
    template: _.template($("#shape-template").html()),
    render: function() {
        $('#page').append(this.el);
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).css({ position: 'absolute', padding: '10px' });
        //var template = _.template($("#shape-template").html(), {title: this.model.get('title')});
        //$(this.el).append(template);
        /*$(this.el).html('<div class="shape"><div class="text-container"><div class="title">' 
                  + this.model.get('title') 
                  + '</div><div class="edittitle hide"/><hr> <div class="thekeys">Keys<ul class="keylist"></ul><div class="add hide"/></div><hr><div class="columns">Columns<ul class="columnlist"></ul><div class="addcolumns hide"/></div></div></div>'
                  + '<div class="control delete hide"/>'
                  //+ '<div class="control change-color hide"/>'
                  + '<div class="control resize hide"/>')
            .css({ position: 'absolute', padding: '10px' });*/
        this.updateView();
        return this;
    },
    updateView: function() {
        var keyslist = "<% _.each(keys, function(title) { %> <li><%= title %></li> <% }); %>";
        this.$('.keylist').html(_.template(keyslist, {keys: this.model.get('keys')}));
        $(this.el).css({
            left:       this.model.get('x'),
            top:        this.model.get('y'),
            width:      this.model.get('width') - 10,
            height:     this.model.get('height') - 10,
            opacity:    this.model.get('opacity')});
        this.$('.shape').css({ background: this.model.get('color') });
        this.$('.title').html(this.model.get('title'));
    },

    template: _.template($('#shape-template').html()),

    events: {
        'mouseenter .shape': 'hoveringStart',
        'mouseleave': 'hoveringEnd',
        'mousedown .shape': 'draggingStart',
        'mousedown .resize': 'resizingStart',
        //'mousedown .change-color': 'changeColor',
        'mousedown .delete': 'deleting',
        'dblclick .title': 'setTitle',
        'mouseenter .title': 'titleHover',
        'mouseup .edittitle': 'setTitle',
        'mouseenter .thekeys': 'keysHover',
        'mouseup .add': 'addKey',
        'mouseenter .columns': 'columnsHover',
        'mouseup .addcolumns': 'addColumn',
    },
    columnsHover: function() {
        this.$('.addcolumns').removeClass('hide');
    },
    addColumn: function() {
        var user_input = prompt('New Column:', 'SOMETHING_HERE :int');
        this.model.get('columns').push(user_input);
        this.$('.columnlist').append('<li>' + this.model.get('columns').pop() + '</li>');
        this.model.get('columns').push(user_input);
        console.log(this.model.get('columns'));
    },
    keysHover: function() {
        this.$('.add').removeClass('hide');
        //console.log('keysHover!');
    },
    addKey: function() {
        //console.log('addKey triggered!');
        var user_input = prompt('New Key:', 'SOMETHING_HERE :int');
        this.model.get('keys').push(user_input);
        this.$('.keylist').append('<li>' + this.model.get('keys').pop() + '</li>');
        this.model.get('keys').push(user_input);
        console.log(this.model.get('keys'));
    },
    titleHover: function() {
        this.$('.edittitle').removeClass('hide');
        //this.model.get('keys').push(232);
        //console.log(this.model.get('keys'));
        //console.log('titleHover triggered');
    },

    setTitle: function () {
        this.model.set({ title: prompt('Title:', this.model.get('title')) });
    },

    hoveringStart: function (e) {
        this.$('.control').removeClass('hide');
    },
    hoveringEnd: function (e) {
        this.$('.control').addClass('hide');
        this.$('.edittitle').addClass('hide');
        this.$('.add').addClass('hide');
        this.$('.addcolumns').addClass('hide');
    },
    draggingStart: function (e) {
        this.dragging = true;
        this.initialX = e.pageX - this.model.get('x');
        this.initialY = e.pageY - this.model.get('y');
        return false; // prevents text selection
    },
    resizingStart: function(e) {
        this.resizing = true;
        return false;
    },
    changeColor: function(e) {
        this.model.set({ color: prompt('Enter color value', this.model.get('color')) });
    },
    deleting: function(e) {
        this.model.collection.remove(this.model);
    },
    mouseup: function (e) {
        if (!e || !e.data) return;
        var self = e.data;
        self.dragging = self.resizing = false;
    },
    mousemove: function(e) {
        if (!e || !e.data) return;
        var self = e.data;
        if (self.dragging) {
            self.model.setTopLeft(e.pageX - self.initialX, e.pageY - self.initialY);
        } else if (self.resizing) {
            self.model.setDim(e.pageX - self.model.get('x'), e.pageY - self.model.get('y'));
        }
    }
});

var document = new Document();
var documentView = new DocumentView({ collection: document });
documentView.render();

$('#new-rectangle').click(function() {
    document.add(new Shape());
});

});