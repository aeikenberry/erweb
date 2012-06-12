var DocumentView =  Backbone.View.extend({
    id: 'page',
    views: {},

    initialize: function() {
        this.collection.bind('add', this.added, this);
        this.collection.bind('remove', this.removed, this);
    },

    render: function() {
        return this;
    },

    added: function(m) {
        this.views[m.cid] = new ShapeView({
            model: m, 
            id:'view_' + m.cid
        }).render();                                        
    },

    removed: function(m) {
        this.views[m.cid].remove();
        delete this.views[m.cid];
    }
});


var documentView = new DocumentView({ collection: document });

documentView.render();

$('#new-shape').click(function() {
    document.add(new Shape());

});