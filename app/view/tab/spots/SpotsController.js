Ext.define('MySpots.view.tab.spots.SpotsController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.spotsController',
	requires : [
	],
	init : function()
	{
		var me = this;
	},
	afterMySpotsMapRender : function( cmp )
	{
		cmp.mask("Loading your spots...", 'basic-map-load-mask');
	},
	onUserSpotsStoreLoad : function( store, records, success, eOpts )
	{
		this.getView().down('#mySpotsMap').unmask();
		console.log( records );
	}
});