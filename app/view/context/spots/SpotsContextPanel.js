Ext.define('MySpots.view.context.spots.SpotsContextPanel',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.spotsContextPanel',
	requires : [
		'MySpots.view.context.spots.SpotInfoView',
		'MySpots.view.context.spots.SpotContextViewModel',
		'MySpots.view.context.spots.SpotContextController',

		'MySpots.view.context.spots.NearbyPlacesPanel'
	],
	layout : {
		type : 'vbox'
	},
	autoScroll : true,
	viewModel : 'spotContextViewModel', //view model consisting of ALL the data relevant to currently selected Spot
	controller : 'spotContextController',
	initComponent : function()
	{
		var me = this;

		me.items = [
			{
				xtype : 'panel',
				title : 'Spot Info',
				collapsible : true,
				items : [
					{
						xtype : 'spotInfoView',
						itemId : 'userSpotInfo'
					}
				],
				width : '100%'
			},
			{
				xtype : 'panel',
				title : 'Transit',
				collapsible : true,
				items : [
					{
						xtype : 'spotInfoView',
						itemId : 'userSpotInfo'
					}
				],
				width : '100%'
			},
			{
				xtype : 'panel',
				title : 'Nearby Places',
				collapsible : true,
				items : [
					{
						xtype : 'nearbyPlacesPanel',
						itemId : 'nearbyPlacesPanel'
					}
				],
				width : '100%'
			}
		];
		me.callParent( arguments );
	}
});