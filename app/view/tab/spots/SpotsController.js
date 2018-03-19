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
		//First remove all markers from the current map
		Ext.Array.forEach( records, function( record )
		{
			var marker = Ext.create('MySpots.fwk.map.BasicMarker',{
				lat : record.get('latitude'),
				lng : record.get('longitude'),
				title : record.get('title'),
				label : record.get('title'),
				recordId : record.getId(),
				draggable : true,
				listeners : {
					click : me.onSpotMarkerClick,
					scope : me
				}
			});

			map.addMarker( marker );
		});
	},
	onSpotMarkerClick : function( marker, e )
	{
		console.log( marker.getTitle() );
		var me = this;
		var markerRecord = me.getViewModel().getStore('userSpots').getById( marker.recordId );
		var map = me.lookupReference('mySpotsMap');
		// map.getNearbyPlaces( 40.7022802,-73.8215184,null, 'subway_station', { rankBy : google.maps.places.RankBy.DISTANCE } ).then( function( records ){
		// 	console.log( records );
		// }, 
		// function( error ){
		// 	console.log( error );
		// });

		me.fireEvent( 'onSpotMarkerClick', marker, markerRecord );
	}
});