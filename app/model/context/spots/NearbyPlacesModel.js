Ext.define('MySpots.model.context.spots.NearbyPlacesModel', {
	extend : 'Ext.data.Model',
	fields : [
		{
			name : 'latitude',
			type : 'string'
		},
		{
			name : 'longitude',
			type : 'string'
		},
		{
			name : 'latlng',
			type : 'string',
			convert : function( value, record )
			{
				//return record.
			}
		},
		{
			name : 'name',
			type : 'string'
		},
		{
			name : 'icon',
			type : 'string',
			mapping : 'icon'
		},
		{
			name : 'placeId',
			type : 'string',
			mapping : 'place_id'
		},
		{
			name : 'rating',
			type : 'string',
			mapping : 'rating'
		}
	]
});