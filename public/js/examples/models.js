/*
 * Item backbone model class (prototype)
 */
var Item = Backbone.Model.extend
({
	url : function() 
	{
		var base = 'items';
		if (this.isNew())
			return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
	},
	defaults: {
		part1: 'hello',
		part2: 'world'
	},
	fullName: function() {
		return this.get('part1') +' ' + this.get('part2');
	}
});

/*
 * ItemList backbone model class (prototype)
 */
var ItemList = Backbone.Collection.extend({
	model: Item,
	url:"/items"
});



/*
 * User backbone model class (prototype)
 */
var User = Backbone.Model.extend
({
	url : function() 
	{
		var base = 'users';
		if (this.isNew())
			return base;
		return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
	}
});

var Users = Backbone.Collection.extend({
	model:User,
	url:"/users",
	alertTest: function()
	{
		alert('test');
	}
});
