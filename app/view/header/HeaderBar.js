/*
	The top header bar of the application
*/
Ext.define('MySpots.view.header.HeaderBar',{
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.headerBar',
	requires : [
		'MySpots.fwk.map.BasicMap',
		'MySpots.fwk.map.BasicInfoWindow',
		'MySpots.fwk.map.BasicPolyline'
	],
	initComponent : function()
	{
		var me = this;
		me.items = [
			{
				xtype : 'component',
				itemId : 'headerLogo',
				reference : 'headerLogo',
				html : '<div><img src="resources/my_spots_logo.jpg" width="75" height="75"/>My Spots</div>',
				width : 90,
				height : 100,
				margin : 0,
				padding : 0
			},
			'->',
			{
				//Replace with a more customized component
				xtype : 'combo',
				hideTrigger : true,
				width : 400,
				emptyText : 'Search for spots, places, images...'
			},
			'->',
			{
            	xtype: 'tbtext',
            	text: 'Anton De Silva',
            	cls: 'top-user-name'
            },
            {
            	//Add 'click' event handler 
                xtype: 'image',
                cls: 'header-right-profile-image',
                height: 35,
                width: 35,
                alt:'current user image',
                src: 'resources/profile_generic_male.svg'
			},
			{
				xtype : 'basic-map',
				itemId : 'basic-map',
				useCurrentLocation : true,
				mapOptions : {
					styles : 'silver',
					zoom : 3,
					center : {
						lat : -34.397,
						lng : 150.644
					}
				},
				width : 500,
				height : 500,
				listeners : {
					zoomchange : function( map, newZoom, oldZoom )
					{
						// console.log('New Zoom:' + newZoom + ', Old Zoom: ' + oldZoom );
						//var m = map.markers;
						
						//map.removeMarker( m.get( m.getKeys()[0] ) );

						var polyline = Ext.create('MySpots.fwk.map.BasicPolyline', {
							path : [
								{lat: 37.772, lng: -122.214},
						        {lat: 21.291, lng: -157.821},
						        {lat: -18.142, lng: 178.431},
						        {lat: -27.467, lng: 153.027}
							]
						});
						map.addPolyline( polyline );

					},
					click : function( map, args )
					{
						var marker = Ext.create('MySpots.fwk.map.BasicMarker', {
							lat : args.map.lat,
							lng : args.map.lng,
							animation : 'drop',
							title : "Places",
							label : 'Australia',
							draggable : true,
							listeners : {
								click : function( marker, event )
								{
									console.log( event );
								}
							}
						});
						//or marker.addToMap( map );
						map.addMarker( marker );

						// var polyline = Ext.create('MySpots.fwk.BasicPolyline', {
						// 	path : [
						// 		{lat: 37.772, lng: -122.214},
						//         {lat: 21.291, lng: -157.821},
						//         {lat: -18.142, lng: 178.431},
						//         {lat: -27.467, lng: 153.027}
						// 	]
						// });
						//map.addPolyline( polyline );

						//polyline = map.polylines.get( map.polylines.getKeys()[0] );
						//polyline.addPoint( args.map.lat, args.map.lng );


						var infoWindow = Ext.create('MySpots.fwk.map.BasicInfoWindow',{
							content : '<h1>Hey there!</h1>',
							tplConfig : {
								tplStr : '<h1>{text}</h1>',
								/*data : {
									text : 'From Template!'
								}*/
							},
							marker : null,
							lat : -27.467,
							lng : 153.027,
							tpl : new Ext.XTemplate( '<h1>{text}</h1>' ),
							
							//maxWidth : 100,
							// lat : 0,//args.map.lat, 
							// lng : 0//0args.map.lng
						});
						infoWindow.loadData({ text : 'loaded from outside'})
						infoWindow.show( map, /*{ lat : -18.142, lng : 178.431}*/ marker );

					},
					polylineadded : function() {
						alert('polyline added')
					},
					markeradded : function() {
						alert('marker added')
					}
				}
			}			
		];
		this.callParent( arguments );
	}
});