var imageViewerTpl = new Ext.XTemplate(
	'<div id="myCarousel" class="carousel slide" data-ride="carousel">',

    	'<ol class="carousel-indicators">',
	      	'<tpl for=".">',
	      		 '<li data-target="#myCarousel" data-slide-to="{[xindex - 1]}" class="{[xindex === 1 ? "active" : ""]}"></li>',
	      	'</tpl>',
		'</ol>',

		'<div class="carousel-inner">',
			'<tpl for=".">',
				'<div class="item {[xindex === 1 ? "active" : ""]}">',
	        		'<img src="{.}" style="width:100%;">',
	      		'</div>',
	      	'</tpl>',
		'</div>',

		'<a class="left carousel-control" href="#myCarousel" data-slide="prev">',
	      '<span class="glyphicon glyphicon-chevron-left"></span>',
	      '<span class="sr-only">Previous</span>',
    	'</a>',
	    '<a class="right carousel-control" href="#myCarousel" data-slide="next">',
	      '<span class="glyphicon glyphicon-chevron-right"></span>',
	      '<span class="sr-only">Next</span>',
	    '</a>',
	    
	'</div>'
);

Ext.define('MySpots.fwk.image.ImageViewer',{
	extend : 'Ext.view.View',
	alias : 'widget.imageViewer',
	requires : [],
	tpl : imageViewerTpl,
	itemSelector : 'div.carousel',
	bind : {
		images : '{images}',
		data : '{images}'
	},
	viewModel : {
		data : {
			images : []
		}
	},
	initComponent : function( config )
	{
		var me = this;
		me.setImages( this.config.images );
		me.callParent( arguments );
	},
	setImages : function( imageArr )
	{
		this.getViewModel().set( 'images', imageArr );
	}
});