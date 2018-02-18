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

		map : undefined, //A map is required to display the info window
		marker : undefined, //if the lat/lng is not specified, use marker,
		infoWindow : undefined //google maps instance of the infoWindow,
	},
	tpl : undefined,
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
				var tplConfig = me.getTplConfig();
				if( tplConfig && tplConfig.tplStr && tplConfig.data )
				{
					var tpl = new Ext.Template( tplConfig.tplStr );
					tpl.compile();
					var generatedHtml = tpl.apply( tplConfig.data );
					infoWinOptions.content = generatedHtml; 
				}
				else
					infoWinOptions.content = me.getContent();

				infoWindow = new googleMaps.InfoWindow( infoWinOptions );
				me.setInfoWindow( infoWindow );

				//Configure Events

			}
		}
		return infoWindow;
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

		var position = {
			lat : me.getLat(),
			lng : me.getLng()
		};
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
			me.getInfoWindow().open( showInMap.getMap());
		}
		else
			throw "Cannot show BasicInfoWindow without a position(latitude and longitude)!";
	},
	/*
		Loads data to the current html template
	*/
	loadData : function( data )
	{
		var me = this;
		if( me.getTplConfig().tplStr )
	}
});