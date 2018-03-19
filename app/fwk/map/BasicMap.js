Ext.define('MySpots.fwk.map.BasicMap',{
	extend : 'Ext.container.Container',
	xtype : [
		'basic-map',
		'basic-google-map'
	],
	requires : [
	'MySpots.fwk.map.GoogleMapsConstants'
	],
	mixins : [
		'Ext.mixin.Mashup',
		//'Ext.util.Observable' - inherited mixin
	],
	//Part of Mashup mixin which synchronously loads external scripts
	requiredScripts : [
		'//maps.googleapis.com/maps/api/js?key=AIzaSyAKCE6FKbwaROHan7GB4KeOe7jCUqTZoeI&libraries=places'
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
			zoom : 10,
			styles : 'default'
		}
	},

	markers : new Ext.util.HashMap(),
	polylines : new Ext.util.HashMap(),

	//defaultListenerScope : true,
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

				//Apply the map styles
				mapOptions.styles = MySpots.fwk.map.BasicMapStyle.styles[ mapOptions.styles ];

				//Initialize a Google Maps object with map options and 
				//attach it to the container's DOM
				var cmpElement = me.getEl();
				map = new googleMaps.Map( cmpElement.dom, mapOptions );
				me.setMap( map );


				//Intialize geolocation
				if( me.getUseCurrentLocation() )
				{
					var geoLocator = navigator.geolocation;
					if( geoLocator )
					{
						//Getting current position is async. b/c we need to ask the user
						//for permission. User might not grant/deny permission instantly
						//so callbacks are used when response is known
						geoLocator.getCurrentPosition( 
							function( position ) //User granted permission
							{
								var currentPos = {
									lat : position.coords.latitude,
									lng : position.coords.longitude
								};
								me.getMap().setCenter( currentPos );
							},
							function( errorMsg ) //User denied permission/other issue
							{
								console.log( errorMsg.code + " : " + errorMsg.message );
							}
						);
					}
				}

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
		return me.removeComponent( markerIdsToRemove, MySpot.fwk.map.BasicMap.MARKER );
	},
	addPolyline : function( polylinesToAdd )
	{
		var me = this;
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
	/*
		Adds a component to the map and BasicMap's cache. Components include BasicMarker,
		and BasicPolyline objects.

		@param mapComponent - a object or array of objects that implements the 'addToMap' 
		function which  should add the component to the underlying Google Maps map
		@return the number of components sucessfuly added.

		Fires an addition event.
	*/
	addComponent : function( mapComponent )
	{
		var me = this;
		var addCount = 0;
		Ext.Array.forEach( me.convertToArray( mapComponent ), function( component ) 
		{
			if( component instanceof MySpots.fwk.map.BasicMarker )
			{
				me.markers.add( component.getId(), component );
				me.fireEvent('markeradded', me, component );
			}
			else if( component instanceof MySpots.fwk.map.BasicPolyline )
			{
				me.polylines.add( component.getId(), component );
				me.fireEvent('polylineadded', me, component );
			}
			component.addToMap( me );
			++addCount;
		});
		return addCount;	
	},
	/*
		Removes component from the map and also removes from BasicMap's local cache. Components include
		BasicMarker, and BasicPolyline objects.

		@param componentIdToRemove - component id or array of component id which
		belong to components on the map. Component should implement removeFromMap
		function which will remove the component from the underlying Google Maps map.
		@param  componentType - one of the static types defined in the statics config

		Fires remove component event
	*/
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
	getNearbyPlaces : function( lat, lng, radius, options )
	{
		var me = this;
		var map = me.getMap();
		if( !map)
			throw "Map not defined!";

		var deferred = new Ext.Deferred();
		var request = {
			location : new google.maps.LatLng( lat, lng) ,
			radius : radius
		};
		request = Ext.Object.merge( request, options );

		if( !request.type instanceof Array )
			request.type = [ request.type ];

		var callback = function( results, status )
		{
			if( status === 'OK' || status === 'ZERO_RESULTS')
			{
				//https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json?accessType=DOWNLOAD
				deferred.resolve( results );
			}
			else
				deferred.reject({ 
					errorCode : status, 
					message :"Unable to get nearby places at this time..."
				});
		};

		var placeService = new google.maps.places.PlacesService( map );
		placeService.nearbySearch( request, callback );



		// var request = {
		// 	placeId : 'ChIJnxVuwsdgwokRF0Ep9JcWjvc'
		// };
		// var service = new google.maps.places.PlacesService(map);
		// service.getDetails(request, function(r){ console.clear();console.log( r);});


		
		return deferred;
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