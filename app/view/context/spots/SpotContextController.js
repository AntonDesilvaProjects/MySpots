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

		//load the nearby place info
		me.getNearbyPlaces( null, 1000, { type : 'supermarket', keyword : 'trade',  openNow : true});
	},
	/*
		Supported filters:
			keyword, type, openNow, minPrice, maxPrice, rankBy[ google.maps.places.RankBy.DISTANCE, google.maps.places.RankBy.PROMINENCE ]
	*/
	getNearbyPlaces : function( marker, radius, filters )
	{
		var me = this;
		var marker = marker || me.getViewModel().get('currentMarker');
		var map = marker.getMap();
		var additionalFilters = {};
		Ext.Object.merge( additionalFilters, filters );

		map.getNearbyPlaces( marker.getLat(), marker.getLng(), radius, additionalFilters ).then( 
		function( response )
		{
			console.log( response );

			//Get reference to the nearbyplaces panel
			//get its viewmodel and load the response object to
			//its nearbyplace store. The grid will autoupdate

		}, function( error ){
			console.log( error );
		});
	}

});