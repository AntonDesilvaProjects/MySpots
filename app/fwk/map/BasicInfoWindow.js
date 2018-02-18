Ext.define('MySpots.fwk.map.BasicInfoWindow',{
	identifier : {
		type : 'sequential',
		prefix : 'infoWin_'
	},
	mixins : [
		'Ext.mixin.Observable'
	],
	statics : {
	},
	config : {
		//Simple config
		content : undefined,
		maxWidth : undefined,
		lat : undefined,
		lng : undefined,
		
		//Advance config
		tplConfig : {	//Using a tplConfig will override the content config
			tplStr : undefined,
			data : undefined
		},
		tpl : undefined, //An already compiled template
		data : undefined, //Load this data into the template

		map : undefined, //A map is required to display the info window
		marker : undefined, //if the lat/lng is not specified, use marker,
		infoWindow : undefined //google maps instance of the infoWindow,
	},
	constructor : function( config )
	{
		var me = this;
		config = Ext.merge( me.config, ( config || {} ) );
		me.mixins.observable.constructor.call(me, config );
		me.initInfoWindow();
	},
	initInfoWindow : function()
	{
		var me = this;
		var infoWindow = me.getInfoWindow();

		if( !infoWindow )
		{
			var googleMaps = ( window.google || {} ).maps;

			if( googleMaps )
			{
				var infoWinOptions = {};
				infoWinOptions.maxWidth = me.getMaxWidth();

				//Configure the content of the info window
				var tpl = me.getTpl(); 
				var tplConfig = me.getTplConfig();

				if( tpl )//If there is already a compiled template, use it
				{
					var generatedHtml = tpl.apply( me.getData() || {} );
					infoWinOptions.content = generatedHtml; 
				}
				else if( tplConfig && tplConfig.tplStr )
				{
					var generatedTpl = new Ext.Template( tplConfig.tplStr );
					me.setTpl( generatedTpl.compile() );
					var generatedHtml = generatedTpl.apply( tplConfig.data ||  me.getData() || {} );
					infoWinOptions.content = generatedHtml; 
				}
				else
					infoWinOptions.content = me.getContent();

				infoWindow = new googleMaps.InfoWindow( infoWinOptions );
				me.setInfoWindow( infoWindow );

				//Register event listeners
				var infoWindowEvents = googleMaps.event;
				infoWindowEvents.addListener( infoWindow, 'closeclick', Ext.bind( me.onInfoWindowClose, me ) );
			}
		}
		return infoWindow;
	},

	/*
		Event Handlers
	*/
	onInfoWindowClose : function()
	{
		var me = this;
		me.fireEvent( 'close', me );
	},

	/*	
		Displays this InfoWindow. To show the InfoWindow, a BasicMap and 
		a position are required. 
	*/
	show : function( map, positionOps )
	{
		//If BasicMap is not available - either as the above argument or
		//config, throw error
		var me = this;
		var showInMap = map || me.getMap(); 
		if( !showInMap )
			throw "Cannot show BasicInfoWindow without a map!";

		var position = me.getMarker() ? me.getMarker() : { lat : me.getLat(), lng : me.getLng() };

		if( positionOps )
			position = positionOps; //Even if position was supplied as an initial
									//config, give preference to args

		if( position instanceof MySpots.fwk.map.BasicMarker )
		{
			me.getInfoWindow().open( showInMap.getMap(), position.getMarker() );
		}
		else if( position.lat && position.lng )
		{
			//update the position
			me.setLat( position.lat );
			me.setLng( position.lng );
			me.getInfoWindow().setPosition( position );
			me.getInfoWindow().open( showInMap.getMap() );
		}
		else
			throw "Cannot show BasicInfoWindow without a position(latitude and longitude)!";
		me.fireEvent( 'show', me );
	},
	/*
		Closes the BasicInfoWindow by removing its DOM element from the map
	*/
	close : function()
	{
		var me = this;
		me.getInfoWindow().close();
	},
	/*
		Loads data to the current html template
	*/
	loadData : function( data )
	{
		var me = this;
		var tpl = me.getTpl();
		if( !tpl )
			throw "Template not defined!";
		me.setContent( tpl.apply( data || {} ) );
		me.getInfoWindow().setContent( me.getContent() );
		me.fireEvent( 'dataloaded', me, data, tpl );
	}
});