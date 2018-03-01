var spotInfoTpl = new Ext.XTemplate( '<div class="spot-info-view">',
								'<h1>{title}</h1>',
								'<h2>{description}</h2>',
								'Location: {lat},{lng}',
								'<br>',
								'<div class="image-stack" spotId="{spotId}">',
									'<img src="{imageUrl}"/>',
									'<span class="bottom-middle">{imageCount} photos</span>',
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
		data : '{spotInfo}'
	},
	viewModel : {
		data : {
			spotInfo : {
				title : 'Texas Chicken + Burgers',
				description : 'My favorite chicken place in Queens!',
				lng : -232.34,
				lat : 24,
				imageUrl : '/static_data/sushi.png',
				imageCount : 10,
				spotId : 23
			}
		}
	},
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
					var win = Ext.widget('window',{
						items : [
							{
								xtype : 'imageViewer',
								images : ['http://www.telegraph.co.uk/content/dam/Travel/2018/January/white-plane-sky.jpg?imwidth=450',
								'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mGqXSiYxAHFp7IKSrzlvNRHi7g4CMYEnUE6WQMxR3PwIF0Uu'],
								width : '100%',
								height : '100%'
							}
						],
						autoShow : true,
						width : 400,
						height : 500,
						title : 'Image Viewer'
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