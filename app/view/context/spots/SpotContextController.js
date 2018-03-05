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
		var userSpotInfo = {
			title : record.get('title'),
			description : record.get('description'),
			lng : record.get('longitude'),
			lat : record.get('latitude'),
			images : record.get('images'),
			spotId : record.get('spotId')
		};
		me.getViewModel().set( 'userSpotInfo', userSpotInfo );
	}
});