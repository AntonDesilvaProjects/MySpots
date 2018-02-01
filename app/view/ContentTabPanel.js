Ext.define('MySpots.view.ContentTabPanel',{
	extend : 'Ext.tab.Panel',
	requires : [
	],
	alias : 'widget.contentTabPanel',
	viewModel : null,
	viewController : null,
	tabPosition : 'left',
	tabRotation : '0',
	initComponent : function()
	{
		var me = this;
		me.items = [
			{
				xtype : 'panel',
				title : 'test',
				items : [
					{
						xtype : 'button',
						text : 'hey there'
					}
				]
			},
			{
				xtype : 'panel',
				title : 'test2',
				items : [
					{
						xtype : 'button',
						text : 'bye there'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});