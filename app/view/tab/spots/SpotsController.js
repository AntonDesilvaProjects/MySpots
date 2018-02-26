Ext.define('MySpots.view.tab.spots.SpotsController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.spotsController',
	requires : [
		'MySpots.fwk.map.BasicMarker'
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
		this.lookupReference('mySpotsMap').unmask();
		this.addSpotMarkersToMap( records );
		console.log( records );
	},
	addSpotMarkersToMap : function( records )
	{
		var me = this;
		var map = me.lookupReference('mySpotsMap');
		Ext.Array.forEach( records, function( record )
		{
			var marker = Ext.create('MySpots.fwk.map.BasicMarker',{
				lat : record.get('latitude'),
				lng : record.get('longitude'),
				title : record.get('title'),
				label : record.get('title'),
				draggable : true,
				listeners : {
					click : me.onSpotMarkerClick
				}
			});

			map.addMarker( marker );
		});
	},
	onSpotMarkerClick : function( marker, e )
	{
		console.log( marker.getTitle() );
	}
});