Ext.define('MySpots.view.tab.spots.Spots',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.spotsTab',
	requires : [
		'MySpots.fwk.map.BasicMap',
		'MySpots.view.tab.spots.SpotsController',
		'MySpots.view.tab.spots.SpotsModel'
	],
	controller : 'spotsController',
	viewModel : 'spotsModel',
	referenceHolder : true,
	initComponent : function()
	{
		var me = this;
		var mySpotsMap = Ext.widget( 'basic-map', {
			itemId : 'mySpotsMap',
			reference : 'mySpotsMap',
			useCurrentLocation : true,
			mapOptions : {
				styles : 'night',
				zoom : 15,
				center : {
					lat : -34.397,
					lng : 150.644
				}
			},
			width : '100%',
			height : '100%',
			listeners : {
				afterrender : 'afterMySpotsMapRender'
			}
		});
		
		me.items = [
			mySpotsMap
		];
		me.callParent( arguments );
	}
});