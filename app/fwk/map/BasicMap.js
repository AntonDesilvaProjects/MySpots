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
		}, 
		listeners : null //Set of event handlers for various events fired by the BasicMap
	},
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

				//Attach event listeners
				var mapEvent = googleMaps.event;
				mapEvent.addListener( map, 'zoom_changed', Ext.bind( me.onZoomChanged, me ) );

			}
		}
		return map;
	},
	onZoomChanged : function()
	{
		alert('zoom changed');
	}
});