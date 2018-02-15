Ext.define('MySpots.fwk.BasicInfoWindow',{
	identifier : {
		type : 'sequential',
		prefix : 'infoWin_'
	},
	mixins : [
		'Ext.util.Observable'
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

		map : null, //A map is required to display the info window
		marker : null //if the lat/lng is not specified, use marker
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
		var config = me.getConfig();

		var infoWinOptions = {};
		infoWinOptions.maxWidth = config.getMaxWidth();

		//Configure the content of the info window
		if( config.tplConfig )
		{
			var tpl = new Ext.Template( config.tplConfig.tplStr );
			tpl.compile();
			var generatedHtml = tpl.apply( config.tplConfig.data );
			infoWinOptions.content = generatedHtml; 
		}
		else
			infoWinOptions.content = config.getContent();


	},
	/*
		Displays this InfoWindow. To show the InfoWindow, a BasicMap is 
		required supplied either as a parameter or via config.

		If a BasicMarker is specified, then use it to position the window.
		Otherwise, look at the config marker followed by lat/lng. If none 
		are available, cannot display window
	*/
	show : function( map, marker )
	{
		//If map + marker are both defined, then use those
		//If only map is defined, use lat + lng( not available)
		//
	}
});