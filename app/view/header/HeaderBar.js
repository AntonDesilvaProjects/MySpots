/*
	The top header bar of the application
*/
Ext.define('MySpots.view.header.HeaderBar',{
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.headerBar',
	requires : [
		'MySpot.fwk.map.BasicMap'
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
				mapOptions : {
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
						var m = map.markers;
						
						map.removeMarker( m.get( m.getKeys()[0] ) );

					},
					click : function( map, args )
					{
						var marker = Ext.create('MySpots.fwk.BasicMarker', {
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

						var polyline = Ext.create('MySpots.fwk.BasicPolyline', {
							path : [
								{lat: 37.772, lng: -122.214},
						        {lat: 21.291, lng: -157.821},
						        {lat: -18.142, lng: 178.431},
						        {lat: -27.467, lng: 153.027}
							]
						});
						//map.addPolyline( polyline );
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
		/*

					debugger;
			
			var el = me.getEl();
			var cmpElement = me.getEl().dom.id;

			//var a = document.getElementById( cmpElement );

			map = new google.maps.Map( el.dom, {
				center : {
					lat : -34.397,
					lng : 150.644
				},
				zoom : mapOptions.zoom
			});
			me.setMap( map );
	*/
	}
});