Ext.define('MySpots.fwk.BasicPolyline',{
	identifier : {
		type : 'sequential',
		prefix : 'polyline_'
	},
	mixins : [
		'Ext.mixin.Observable'
	],
	statics : {

	},
	config : {
		strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        draggable : true,
        visible : true,
        path : undefined, //initial array of points to draw the polyline with,
        geodesic : true,

        polyline : undefined,
        map : undefined
	},
	constructor : function( config )
	{
		var me = this;
		config = Ext.merge( me.config, ( config || {} ) );
		me.mixins.observable.constructor.call( me, config );
		me.initPolyline();
	},
	initPolyline : function()
	{
		var me = this;
		var googleMaps = ( window.google || {} ).maps;

		if( !googleMaps )
			throw "Cannot locate the Google Maps API!";

		//Generate a config for the polyline
		var polylineConfig = {};
		polylineConfig.strokeColor = me.getStrokeColor();
		polylineConfig.strokeOpacity = me.getStrokeOpacity();
		polylineConfig.strokeWeight = me.getStrokeWeight();
		polylineConfig.draggable = me.getDraggable();
		polylineConfig.visible = me.getVisible();

		polylineConfig.path = me.getPath();

		//Create Google maps Polyline with config
		var polyline = new googleMaps.Polyline( polylineConfig );
		me.setPolyline( polyline );

		//Register event listeners
		var polylineEvents = googleMaps.event;
		polylineEvents.addListener( polyline, 'click', Ext.bind( me.onPolylineClick, me ) );

		return polyline;
	},
	onPolylineClick : function( clickEvent )
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
	addToMap : function( basicMap ) //BasicMap object
	{
		var me = this;
		me.setMap( basicMap );
		me.getPolyline().setMap( basicMap.getMap() );
	},
	removeFromMap : function()
	{
		var me = this;
		if( me.getMap() === undefined ) //polyline not associated with a map
			return;
		me.setMap( undefined );
		me.getPolyline().setMap( null );
	},
	addPoint : function( lat, lng )
	{

	},
	/*
		Removes a point on the polyline based on 
		@param lat and lng
	*/
	removePoint : function( lat, lng )
	{

	}
});