var ItemView = Backbone.View.extend(
{

	/* events()
	 * 
	 * ItemView responds to swap and delete clickable actions (for each item)
	 */ 
	events: 
	{
		'click .swap':  'swap',
		'click .delete': 'remove'
	},
	/*  initialize()
	 *
	 *	Now binds model change/removal to the corresponding handlers below.
	 */
	initialize: function() 
	{
		// every function that uses 'this' as the current object should be in here
		_.bindAll(this, 'render', 'unrender', 'swap', 'remove');

		this.model.bind('change', this.render);
		this.model.bind('remove', this.unrender);
	},
	/* 	render()
	 *
	 *	now includes two extra `span`s corresponding to the actions swap and delete.
	 */
	render: function() 
	{
		var newSpan = $('#item_view_template').clone();

		newSpan.removeClass("hidden");
		newSpan.find(".item_name").html(this.model.fullName());
		$(this.el).html(newSpan);

		return this;
	},
	/* 	unrender()
	 *	Makes Model remove itself from the DOM.
	 */
	unrender: function() 
	{
		$(this.el).remove();
	},
	/* 	swap()
	 *
	 *	Will interchange an `Item`'s attributes.
	 *	When the `.set()` model function is called, the event `change` will be triggered.
	 */
	swap: function() 
	{
		var swapped = 
		{
			part1: this.model.get('part2'),
			part2: this.model.get('part1')
		};
		this.model.set(swapped);
		this.model.save();
	},
	/* 	remove()
	 *
	 *	We use the method `destroy()` to remove a model from its collection.
	 *	Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
	 */
	remove: function() 
	{
		this.model.destroy
		({
			error: function(model,response) 
			{
				//alert("fail");
			}
		});
	}
});