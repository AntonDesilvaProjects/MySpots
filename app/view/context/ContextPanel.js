/*
	This is a context sensitive data panel that will show information relevant to 
	whatever the user is looking at.
*/
Ext.define('MySpot.view.context.ContextPanel',{
	extend : 'Ext.panel.Panel',
	requires : [],
	alias : 'widget.contextPanel',
	title : 'Map Info',
	layout : {
		type : 'vbox' //change to card layout so we can flip between cards for each tab
	},
	width : 250,
	collapsible : true,
	border : 1,
	intComponent : function()
	{
		var me = this;
		me.callParent( arguments );
	}
});