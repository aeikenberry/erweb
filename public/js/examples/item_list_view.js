/*	
 *	Because the new features (swap and delete) are intrinsic to each `Item`, there is no need to modify `ListView`.
 */
var ItemListView = Backbone.View.extend(
{
    // el attaches to existing element
    el: '#item_list_view', 

    /*	events()
     *
     */
    events: 
    {
      'click #addItemButton': 'addItemAction'
    },
    
    /*	initialize()
     *
     */
    initialize: function()
    {
     // every function that uses 'this' as the current object should be in here
      _.bindAll(this, 'render', 'addItemAction', 'addItemToView'); 
      this.collection = new ItemList();

      this.counter = 0;
      this.render();
    },
    
    /*	render()
     *
     */
    render: function()
    {      
      _(this.collection.models).each
      (
      		function(item) 
      		{  
      			addItemToView(item); 
      		}, 
      this);
    },
    
    /* addItemAction()
     *
     */
    addItemAction: function()
    {
      this.counter++;

	  // Create a new Item model
      var item = new Item();
      item.set({part2: item.get('part2') + this.counter });

	  // Add item to collection and view
      this.collection.add(item);      
      this.addItemToView(item);
    },

    /* appendItemToHTML(item)
     *
     */
    addItemToView: function(item)
    {
	  var self=this;
      // Create a new itemView instance, and attach to (this) listView
      var itemView = new ItemView({model: item});

  	  item.save(item.toJSON,
  	  {
  	  	success:function()
  	  	{
  	  		$(self.el).append(itemView.render().el);
  	  		//alert("success!");
  	  	},
  	  	error: function()
  	  	{
  	  		alert("You must first signon to add new items");
  	  	}
  	  });
	  
    }
});