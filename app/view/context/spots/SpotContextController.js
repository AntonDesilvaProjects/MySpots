Ext.define('MySpots.view.context.spots.SpotContextController',{
	extend : 'Ext.app.ViewController',
	requires : [],
	alias : 'controller.spotContextController',
	listeners : {

	},
	listen : {
		controller : {
			'*' : {
				onSpotMarkerClick : 'onSpotMarkerClick'
			}
		}
	},
	init : function()
	{

	},
	onSpotMarkerClick : function( marker, record )
	{
		var me = this;
		//Load the user's spot information to the viewmodel
		var userSpotInfo = {
			title : record.get('title'),
			description : record.get('description'),
			lng : record.get('longitude'),
			lat : record.get('latitude'),
			images : record.get('images'),
			spotId : record.get('spotId')
		};
		me.getViewModel().set('currentMarker', marker );
		me.getViewModel().set('userSpotInfo', userSpotInfo );

		me.getView().down('#nearbyPlacesPanel').setDisabled( false );

		//load the nearby place info
		//{ type : 'subway_station',/* keyword : '',  openNow : true, */rankBy : google.maps.places.RankBy.DISTANCE }
		me.getNearbyPlaces( null, 1700, {  } );
	},
	/*
		Supported filters:
			keyword, type, openNow, minPrice, maxPrice, rankBy[ google.maps.places.RankBy.DISTANCE, google.maps.places.RankBy.PROMINENCE ]
	*/
	getNearbyPlaces : function( marker, radius, filters )
	{
		var me = this;
		var marker = marker || me.getViewModel().get('currentMarker');

		if( !marker )
			return;

		var map = marker.getMap();
		var additionalFilters = {};
		Ext.Object.merge( additionalFilters, filters );

		map.getNearbyPlaces( marker.getLat(), marker.getLng(), radius, additionalFilters ).then( 
		function( response )
		{
			//Get reference to the nearbyplaces panel
			console.log( response );
			var nearbyPlacesStore = me.getView().down('#nearbyPlacesPanel').getViewModel().getStore('searchResultsStore');
			var nearbyPlaces = [];
			Ext.Array.forEach( response, function( nearbyPlace ){
				var placeModel = Ext.create('MySpots.model.context.spots.NearbyPlacesModel',{
					latitude : nearbyPlace.geometry.location.lat(),
					longitude : nearbyPlace.geometry.location.lng(),
					name : nearbyPlace.name,
					icon : nearbyPlace.icon,
					placeId : nearbyPlace.place_id,
					rating : nearbyPlace.rating
				});
				nearbyPlaces.push( placeModel );
			});
			nearbyPlacesStore.loadData( nearbyPlaces );

		}, function( error ) {
			console.log( error );
		});
	}

});