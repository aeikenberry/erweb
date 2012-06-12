var UserPanelView = Backbone.View.extend({
	// el attaches to existing element
	el: '#user_panel_view',

	/* events()
	 *
	 * ItemView responds to swap and delete clickable actions (for each item)
	 */
	events: {
		'keypress #password': 'submitOnEnterAction',
		'click #sign_on_button': 'signOnAction',
		'click #register_button': 'registerAction'
	},
	/*  initialize()
	 *
	 *	Now binds model change/removal to the corresponding handlers below.
	 */
	initialize: function() {
		_.bindAll(this, 'render', 'submitOnEnterAction','signOnAction', 'registerAction');
	},
	signOnAction: function() 
	{
		// Get the uid/pwd from the textfields
		var uid=$("#username").val();
		var pwd=Base64Utility.encode($("#password").val());
		
		// Create a usersLookup collection for the fetch
		var usersLookup=new Users();
		
		// Custom HTTP header implementation
		App.fetchQualifiers='{"username":"'+uid+'","password":"'+pwd+'"}';
		
		// Update the UI  
		$("#sign_on_message").css("color","gray");
		$("#sign_on_message").text("Please wait..");
		
		// Backbone fetch users matching the uid/pwd
		usersLookup.fetch
		({
			success: function(response) 
			{
				// Update the UI
				$("#sign_on_message").css("color","green");
				$("#sign_on_message").text("Sign on successful");
				$("#item_list_view_header").removeClass("hidden").hide().fadeIn('slow');
				$("#user_panel_view").slideUp('slow');
				
				// Set the App's uid:pwd 
				// This is used for each request going forward (Basic Auth)
				App.username=uid;
				App.password=pwd;
			},
			error: function(response)
			{
				// Update the UI
				$("#sign_on_message").css("color","red");
				$("#sign_on_message").text("Failure in authentication");
			}
		});

	},
	submitOnEnterAction: function(event) 
	{
		if (event.keyCode==13)
			this.signOnAction();
	},
	registerAction: function() 
	{
		// Create a new backbone user model
		var newUser = new User
		({
			username: $("#username").val(),
			password: Base64Utility.encode($("#password").val())
		});

		// Save the new backbone user
		newUser.save(newUser.toJSON,
		{
			success: function(response)
			{
				// Update the UI
				$("#sign_on_message").css("color","green");
				$("#sign_on_message").text("Registration complete!  Please sign on to begin.").hide().fadeIn();
				
			},
			error: function(response)
			{
				// Update the UI
				$("#sign_on_message").css("color","red");
				$("#sign_on_message").text("Unable to register with those credentials.").hide().fadeIn();
			}
		});

	},
	/* 	render()
	 *
	 *	now includes two extra `span`s corresponding to the actions swap and delete.
	 */
	render: function() {
		// not implemented
	}
});