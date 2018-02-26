Ext.define('MySpots.model.UserSpot',{
	extend : 'Ext.data.Model',
	fields : [
		{
			name : 'latitude',
			type : 'float',
			mapping : 'latitude'
		},
		{
			name : 'longitude',
			type : 'float',
			mapping : 'longitude'
		},
		{
			name : 'title',
			type : 'string',
			mapping : 'title'
		},
		{
			name : 'description',
			type : 'string',
			mapping : 'description'
		},
		{
			name : 'time',
			type : 'string',
			mapping : 'time'
		},
		{
			name : 'isFavorite',
			type : 'boolean',
			mapping : 'isFavorite'
		},
		{
			name : 'images',
			type : 'auto',
			mapping : 'images'
		}
	]
});