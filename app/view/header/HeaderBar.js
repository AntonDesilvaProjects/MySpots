/*
	The top header bar of the application
*/
Ext.define('MySpots.view.header.HeaderBar',{
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.headerBar',
	requires : [
		'MySpots.fwk.map.BasicMap',
		'MySpots.fwk.map.BasicInfoWindow',
		'MySpots.fwk.map.BasicPolyline',
		'MySpots.fwk.image.ImageViewer'
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
			}
		];
		this.callParent( arguments );
	}
});