/*
	This is a context sensitive data panel that will show information relevant to 
	whatever the user is looking at.
*/
Ext.define('MySpot.view.context.ContextPanel',{
	extend : 'Ext.panel.Panel',
	requires : [
		'MySpots.view.context.spots.SpotsContextPanel'
	],
	alias : 'widget.contextPanel',
	title : 'Map Info',
	layout : {
		type : 'card' //change to card layout so we can flip between cards for each context
	},
	width : 350,
	collapsible : true,
	border : 1,
	controller : null,
	viewModel : null,
	statics : {
		CONTEXT : {
			SPOTS : 'spots'
		}
	},
	initComponent : function()
	{
		var me = this;
		var spotsContextPanel = Ext.widget( 'spotsContextPanel',{
			width : '100%'
		});
		me.items = [
			spotsContextPanel
		];
		me.callParent( arguments );
	},
	/*
		Switches context based on passed in parameters.
		@param context - the context to switch to.
	*/
	switchContext : function( context )
	{

	}
});