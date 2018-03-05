/*
	Displays Spot information uploaded by the user. This info. includes Spot name,
	position, images, etc.
*/
var spotInfoTpl = new Ext.XTemplate( '<div class="spot-info-view">',
								'<h3>{title}</h3>',
								'<h4>{description}</h4>',
								'Location: {lat},{lng}',
								'<br>',
								'<div class="image-stack" spotId="{spotId}">',
									'<img src="{[values.images[0]]}"/>',
									'<span class="bottom-middle">{[values.images.length]} photo(s)</span>',
								'</div>',
							'</div>');

Ext.define('MySpots.view.context.spots.SpotInfoView', {
	extend : 'Ext.view.View',
	alias : 'widget.spotInfoView',
	requires : [
		'MySpots.fwk.image.ImageViewer'
	],
	tpl : spotInfoTpl,
	itemSelector : 'div.spot-info-view',
	bind : {
		data : '{userSpotInfo}'
	},
	/*viewModel : {
		data : {
			userSpotInfo : {
				title : 'Texas Chicken + Burgers',
				description : 'My favorite chicken place in Queens!',
				lng : -232.34,
				lat : 24,
				images : [ '/static_data/sushi.png' ],
				spotId : 23
			}
		}
	},*/
	//Delegated events are events that are attached to a parent element, but only get executed when the target of the event matches some criteria.
	listeners : {
		el : {
			delegate : 'div.image-stack',
			click : function( event, target )
			{
				try
				{
					var spotId = target.attributes.spotid.nodeValue;
					//Make Ajax call to fetch the images
					//Launch image viewer
					var imgs = Ext.ComponentQuery.query('#userSpotInfo')[0].getData().images
					debugger;

					var win = Ext.widget('window', {
						items : [
							{
								xtype : 'imageViewer',
								bind : {
									images : '{userSpotInfo.images}'
								},
								width : '100%',
								height : '100%'
							}
						],
						itemId : 'myWind',
						autoShow : true,
						//modal : true,
						width : 500,
						height : 400,
						title : 'Image Viewer',
						listeners : {
							myCustomEvent : function()
							{
								alert('recieved custom event!')
							}
						}
					});
				}
				catch( err )
				{
					console.log( err );
				}
			}
		}
	}
});