/*
	This is the main page that will host all other components inside
	it.
*/
Ext.define('MySpots.view.main.MainPage',{
	extend : 'Ext.container.Container',
	alias : 'widget.mainPage',
	requires : [
		'MySpots.view.tab.ContentTabPanel',
		'MySpots.view.header.HeaderBar',
		'MySpot.view.context.ContextPanel'
	],
	viewModel : null,
	viewController : null,
	layout : {
		type : 'border'
	},
	items : [
		{
			xtype : 'headerBar',
			region : 'north'
		},
		{
			xtype : 'contentTabPanel',
			region : 'center'
		},
		{
			xtype : 'contextPanel',
			region : 'east'
		}
	]
});