Ext.define('MySpots.view.context.spots.SpotInfoView', {
	extend : 'Ext.view.View',
	alias : 'widget.spotInfoView',
	requires : [
	],
	tpl : new Ext.XTemplate( '<div class="spot-info-view">',
								'<h1>{title}</h1>',
								'<h2>{description}</h2>',
								'Location: {lat},{lng}',
								'<br>',
								'<div class="image-stack">',
									'<img src="{imageUrl}"/>',
									'<span class="bottom-middle">{imageCount} photos</span>',
								'</div>',
							'</div>'),
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
				imageCount : 10
			}
		}
	},
	listeners : {
		itemclick : function( view, record, item, index, e, eOpts )
		{
			console.log( item );
		}
	}
});