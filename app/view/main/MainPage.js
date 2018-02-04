/*
	This is the main page that will host all other components inside
	it.
*/
Ext.define('MySpots.view.main.MainPage',{
	extend : 'Ext.container.Container',
	alias : 'widget.mainPage',
	requires : [
		'MySpots.view.tab.ContentTabPanel',
		'MySpots.view.header.HeaderBar'
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
		}
	]
});