Ext.define('MySpots.fwk.map.MapServices',{
	mixins : [
		'Ext.mixin.Mashup'
	],
	statics : {
		GOOGLE_MAPS_PLACES_URL : 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
		PLACE_TYPES : {
			TRAIN_STATION : 'train_station'
		},
	},
	requiredScripts : [
		'https://apis.google.com/js/api.js'
	],
	constructor : function()
	{
		gapi.load('client', )
	},
		/*
		Call Google Places API to fecth the nearby places. Only one placeType
		can be specified. Google Place API call has 3 mandatory fields:
		location, radius,key.

		options = {
			type : 'bus_station',
			keyword : '',
			language : '',
			minprice : '',
			maxprice : '',
			name : '',
			opennow : true
		}

		https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7022802,-73.8215184&radius=1000&type=bus_station&key=AIzaSyAKCE6FKbwaROHan7GB4KeOe7jCUqTZoeI
	*/
	getNearbyPlaces : function( lat, lng, radius, options )
	{
		var me = this;
		var location = 'location=' + lat + ',' + lng;
		var coreUrl = MySpots.fwk.map.MapServices.GOOGLE_MAPS_PLACES_URL + location + '&radius=' + radius + '&key=AIzaSyAKCE6FKbwaROHan7GB4KeOe7jCUqTZoeI';
		var finalUrl = me.buildPlacesRequest( coreUrl, options );
		console.log( finalUrl );

		var deferred = new Ext.Deferred();
		Ext.Ajax.request({
			url : finalUrl,

			success : function( response, options )
			{
				var responseObj = Ext.decode( response.responseText );
				deferred.resolve( responseObj );
			},
			failure : function( response, options )
			{
				deferred.reject( response.status );
			}
		});

		return deferred;
		//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={0},{1}&radius={2}&type={3}&key=AIzaSyAKCE6FKbwaROHan7GB4KeOe7jCUqTZoeI&keyword={4}&language={5}&minprice={6}&maxprice={7}&name={8}
	},

	buildPlacesRequest : function( coreRequest, options )
	{
		Ext.Array.forEach( Ext.Object.getKeys( options ), function( key ) {
			var paramTpl = '{0}={1}';
			var params = Ext.String.format( paramTpl, key, options[ key ] );
			coreRequest += ( '&' + params );
		});
		return coreRequest;
	}
});