Ext.define('MySpots.view.context.spots.SpotsContextPanel',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.spotsContextPanel',
	requires : [
		'MySpots.view.context.spots.SpotInfoView'
	],
	layout : {
		type : 'vbox'
	},
	viewModel : null,
	controller : null,
	initComponent : function()
	{
		var me = this;
		var spotInfoView = Ext.widget( 'spotInfoView');
		me.items = [
			spotInfoView
		];
		me.callParent( arguments );
	}
});