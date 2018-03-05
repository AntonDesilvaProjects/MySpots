Ext.define('MySpots.view.context.spots.SpotsContextPanel',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.spotsContextPanel',
	requires : [
		'MySpots.view.context.spots.SpotInfoView',
		'MySpots.view.context.spots.SpotContextViewModel',
		'MySpots.view.context.spots.SpotContextController'
	],
	layout : {
		type : 'vbox'
	},
	viewModel : 'spotContextViewModel', //view model consisting of ALL the data relevant to currently selected Spot
	controller : 'spotContextController',
	initComponent : function()
	{
		var me = this;
		var spotInfoView = Ext.widget( 'spotInfoView',{
			itemId : 'spotInfoView'
		});
		me.items = [
			spotInfoView
		];
		me.callParent( arguments );
	}
});