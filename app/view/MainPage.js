/*
	This is the main page that will host all other components inside
	it.
*/
Ext.define('MySpots.view.MainPage',{
	extend : 'Ext.container.Container',
	alias : 'widget.mainPage',
	requires : [
		'MySpots.view.ContentTabPanel'
	],
	viewModel : null,
	viewController : null,
	layout : {
		type : 'border'
	},
	items : [
		{
			xtype : 'contentTabPanel',
			region : 'center'
		}
	]
});