/*
	Displays Spot information uploaded by the user. This info. includes Spot name,
	position, images, etc.
*/
var spotInfoTpl = new Ext.XTemplate( 
						'<tpl if="!Ext.isEmpty(title)">',
							'<div class="spot-info-view">',
								'<h3>{title}</h3>',
								'<h4>{description}</h4>',
								'Location: {lat},{lng}',
								'<br>',
								'<div class="image-stack" spotId="{spotId}">',
									'<img src="{[values.images[0]]}"/>',
									'<span class="bottom-middle">{[values.images.length]} photo(s)</span>',
								'</div>',
							'</div>',
						'<tpl else>',
							'<div class="spot-info-view">',
								'<h3>Select a Spot to see its information</h3>',
							'</div>',
						'</tpl>');

Ext.define('MySpots.view.context.spots.SpotInfoView', {
	extend : 'Ext.view.View',
	alias : 'widget.spotInfoView',
	requires : [
		'MySpots.fwk.image.ImageViewer'
	],
	tpl : spotInfoTpl,
	itemSelector : 'div.spot-info-view',
	bind : {
		data : '{userSpotInfo}' //We have automatic access to this component's parent's view model
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
				var me = this;
				try
				{
					var spotId = target.attributes.spotid.nodeValue;
					var imageWindow = Ext.widget('window', {
						items : [
							{
								xtype : 'imageViewer',
								images : me.component.data.images,
								width : 500,
								height : 350
							}
						],
						itemId : 'imageWindow',
						autoShow : true,
						modal : true,
						width : 500,
						height : 350,
						title : 'Images'
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