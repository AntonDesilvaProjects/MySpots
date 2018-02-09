/*
	Wrapper around the Google Maps marker object. An instance of this
	class has to be passed to a BasicMap object in order to be drawn.
*/
Ext.define('MySpots.fwk.BasicMarker', {
	identifier : {
		type : 'sequential',
		prefix : 'marker_'
	},
	mixins : [
		'Ext.mixin.Observable'
	],
	statics : {
		BOUNCE : 'bounce',
		DROP : 'drop'
	},
	config : {

		//Basic configs
		lat : undefined,
		lng : undefined,
		title : undefined,
		label : undefined,
		draggable : false,

		//complex configs
		icon : undefined,
		shape : undefined,
		animation : undefined,

		marker : undefined
	},
	constructor : function( config )
	{
		var me = this;
		config = Ext.merge( me.config, ( config || {} ) );
		me.mixins.observable.constructor.call(me, config );
		me.initMarker();
	},
	/*
		Initialize the marker by generating a google.maps.Marker object
		and registering handlers for its events
	*/
	initMarker : function()
	{
		var me = this;
		var googleMaps = ( window.google || {} ).maps;

		if( !googleMaps )
			throw "Cannot locate the Google Maps API!";
		if( !( me.getLat() && me.getLng() ) )
			throw "Latitude and Longitude are required to create a marker!"

		//Generate a config for the marker
		var markerConfig = {};
		var positionObj = {
			lat : me.getLat(),
			lng : me.getLng()
		};
		markerConfig.position = positionObj;
		markerConfig.title = me.getTitle() || '';
		markerConfig.label = me.getLabel() || '';
		markerConfig.draggable = me.getDraggable();

		markerConfig.icon = me.getIcon();
		markerConfig.shape = me.getShape();
		if( me.getAnimation() !== undefined )
		{
			if( me.getAnimation() === MySpots.fwk.BasicMarker.BOUNCE )
				markerConfig.animation = googleMaps.Animation.BOUNCE;
			else if( me.getAnimation() === MySpots.fwk.BasicMarker.DROP )
				markerConfig.animation = googleMaps.Animation.DROP;
		}

		//Create Google Marker with the generated config
		var marker = new googleMaps.Marker( markerConfig );
		me.setMarker( marker );

		//Register event listeners
		var markerEvents = googleMaps.event;
		markerEvents.addListener( marker, 'click', Ext.bind( me.onMarkerClick, me ) );

		return marker;
	},

	/*
		Event Handlers
	*/
	onMarkerClick : function( clickEvent )
	{
		var me = this;
		var args = {
			map : {
				lat : clickEvent.latLng.lat(),
				lng : clickEvent.latLng.lng()
			},
			mouse : {
				x : clickEvent.pixel ? clickEvent.pixel.x : null,
				y : clickEvent.pixel ? clickEvent.pixel.y : null
			}
		};
		me.fireEvent( 'click', me, args );
	},

	/*
		Core Functionality
	*/
	addToMap : function( basicMap ) //google map object
	{
		var me = this;
		me.getMarker().setMap( basicMap.getMap() );
	}
});