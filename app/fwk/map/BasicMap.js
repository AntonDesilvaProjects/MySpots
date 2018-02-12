Ext.define('MySpot.fwk.map.BasicMap',{
	extend : 'Ext.container.Container',
	xtype : [
		'basic-map',
		'basic-google-map'
	],
	requires : [
	],
	mixins : [
		'Ext.mixin.Mashup',
		//'Ext.util.Observable' - inherited mixin
	],
	//Part of Mashup mixin which synchronously loads external scripts
	requiredScripts : [
		'//maps.googleapis.com/maps/api/js?key=AIzaSyAKCE6FKbwaROHan7GB4KeOe7jCUqTZoeI'
	],
	statics : {
		POLYLINE : 'polyline',
		MARKER : 'marker'
	},
	config : {
		map : null, //Instance of Google Maps object
		useCurrentLocation : false, //Should the map automatically center at the current location ?
		//Options defined at https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		mapOptions : {
			backgroundColor : null,
			center : {
				lat : null,
				lng : null
			},
			clickableIcons : true,
			draggable : true,
			mapTypeId : 'roadmap',
			maxZoom : null,
			minZoom : null,
			zoom : 10
		}
	},

	markers : new Ext.util.HashMap(),
	polylines : new Ext.util.HashMap(),

	defaultListenerScope : true,
	/*
		Merge the default config with client config and initialize the component.
	*/
	constructor : function( config )
	{
		var me = this;
		config = Ext.merge( me.config, config );
		me.callParent( [config] );
	},
	initComponent : function()
	{
		var me = this;
		me.callParent( arguments );
	},
	/*
		ExtJS container lifecycle hook. Called after the HTML for the container
		renders. Since we need to attach the Google Map to an existing DOM element,
		this is where the DOM of the component first becomes available.
	*/
	afterRender : function()
	{
		var me = this;
		me.callParent(arguments);
		me.initBasicMap();
	},
	/*
		Initializes an instance of Google maps with the supplied configs. 
		Also sets up event listeners.
	*/
	initBasicMap : function() 
	{
		var me = this;
		var map = me.getMap();

		if( !me.map )
		{
			var mapOptions = me.getMapOptions();
			var googleMaps = ( window.google || {} ).maps;

			if( googleMaps )
			{
				//Initialize a Google Maps object with map options and 
				//attach it to the container's DOM
				var cmpElement = me.getEl();
				map = new googleMaps.Map( cmpElement.dom, mapOptions );
				me.setMap( map );

				me.prevZoom = mapOptions.zoom;

				//Attach event listeners
				var mapEvent = googleMaps.event;
				mapEvent.addListener( map, 'click', Ext.bind( me.onMapClick, me ) );
				mapEvent.addListener( map, 'zoom_changed', Ext.bind( me.onZoomChanged, me ) );
			}
		}
		return map;
	},

	/*
		Event listeners
	*/
	onZoomChanged : function()
	{
		var me = this;
		var map = me.getMap();
		me.fireEvent('zoomchange', me, map.zoom, me.prevZoom );
		me.prevZoom = me.getMap().zoom;
	},
	onMapClick : function( clickEvent )
	{
		var me = this;
		var map = me.getMap();
		var args = {
			map : {
				lat : clickEvent.latLng.lat(),
				lng : clickEvent.latLng.lng()
			},
			mouse : {
				x : clickEvent.pixel ? clickEvent.pixel.x : null,
				y : clickEvent.pixel ? clickEvent.pixel.y : null
			},
			placeId : clickEvent.placeId
		};
		me.fireEvent('click', me, args );
	},
	/*
		Map core functionality
	*/
	addMarker : function( markersToAdd )
	{
		var me = this;
		// Ext.Array.forEach( me.convertToArray( markersToAdd ), function( marker ) {
		// 	me.markers.add( marker.getId(), marker );
		// 	marker.addToMap( me );
		// });
		// me.fireEvent('markeradded', me );
		me.addComponent( markersToAdd );

	},
	/*
		Removes marker(s) from the map.
		@param markersToRemove - a marker object or array of marker objects
		@return - number of markers removed
	*/
	removeMarker : function( markersToRemove )
	{
		var me = this;
		var markerIdsToRemove = [];
		Ext.Array.forEach( me.convertToArray( markersToRemove ), function( marker ) {
			markerIdsToRemove.push( marker.getId() );
		});	
		if( markerIdsToRemove.length > 0 )
			return me.removeMarkerById( markerIdsToRemove );
		return 0;
	},
	/*
		Removes marker(s) from the map if the specified marker is in this
		map.
		@param markerIdsToRemove - a marker id or array of marker ids
		@return - number of markers removed
	*/
	removeMarkerById : function( markerIdsToRemove )
	{
		var me = this;
		// var removeCount = 0;
		// Ext.Array.forEach( me.convertToArray( markerIdsToRemove ), function( marker ) {
		// 	var markerToRemove = me.markers.get( marker );
		// 	if( markerToRemove )
		// 	{
		// 		me.markers.removeByKey( marker );
		// 		markerToRemove.removeFromMap();
		// 		++removeCount;
		// 	}
		// });	
		// return removeCount;
		return me.removeComponent( markerIdsToRemove, MySpot.fwk.map.BasicMap.MARKER );
	},
	addPolyline : function( polylinesToAdd )
	{
		var me = this;
		// Ext.Array.forEach( me.convertToArray( polylinesToAdd ), function( polyline ) {
		// 	me.polylines.add( polyline.getId(), polyline );
		// 	polyline.addToMap( me );
		// });
		// me.fireEvent('polylineadded', me );
		me.addComponent( polylinesToAdd );
	},
	removePolyline : function( polylinesToRemove )
	{
		var me = this;
		var polylineIdsToRemove = [];
		Ext.Array.forEach( me.convertToArray( polylinesToRemove ), function( polyline ) {
			polylineIdsToRemove.push( polyline.getId() );
		});	
		if( polylineIdsToRemove.length > 0 )
			return me.removePolylineById( polylineIdsToRemove );
		return 0;
	},
	removePolylineById : function( polylineIdsToRemove )
	{
		var me = this;
		return me.removeComponent( polylineIdsToRemove, MySpot.fwk.map.BasicMap.POLYLINE );
	},
	addComponent : function( mapComponent )
	{
		var me = this;
		var addCount = 0;
		Ext.Array.forEach( me.convertToArray( mapComponent ), function( component ) 
		{
			if( component instanceof MySpots.fwk.BasicMarker )
			{
				me.markers.add( component.getId(), component );
				me.fireEvent('markeradded', me, component );
			}
			else if( component instanceof MySpots.fwk.BasicPolyline )
			{
				me.polylines.add( component.getId(), component );
				me.fireEvent('polylineadded', me, component );
			}
			component.addToMap( me );
			++addCount;
		});
		return addCount;	
	},
	removeComponent : function( componentIdToRemove, componentType )
	{
		var me = this;
		var removeCount = 0;
		Ext.Array.forEach( me.convertToArray( componentIdToRemove ), function( componentId ) 
		{	
			var eventName = undefined;
			var componentMap = undefined;

			if( componentType === MySpot.fwk.map.BasicMap.MARKER )
			{
				componentMap = me.markers;
				eventName = 'markerremove';
			}
			else if( componentType === MySpot.fwk.map.BasicMap.POLYLINE )
			{
				componentMap = me.polylines;
				eventName = 'polylineremove';
			}

			var componentToRemove = ( componentMap !== undefined ) ? componentMap.get( componentId ) : null;
			if( componentToRemove !== null )
			{
				componentMap.removeByKey( componentId );
				componentToRemove.removeFromMap();
				++removeCount;
				if( eventName !== undefined )
					me.fireEvent( eventName, me, componentToRemove );
			}
		});	
		return removeCount;
	},
	setMapStyle : function( styleConfig )
	{
		//put in config
	},

	/*
		Utility functions
	*/
	convertToArray : function( objs )
	{
		if( !Ext.isArray( objs ) )
			objs = [ objs ];
		return objs;
	}
});