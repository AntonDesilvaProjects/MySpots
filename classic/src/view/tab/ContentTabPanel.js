/*
    Tab panel that will hosts the main pages of the application
*/
Ext.define('MySpots.view.tab.ContentTabPanel',{
	extend : 'Ext.tab.Panel',
	requires : [
	],

	alias : 'widget.contentTabPanel',

    border : 1,

	ui: 'navigation',
    titleRotation: 0,
    tabRotation: 0,
    tabPosition : 'left',
    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    items: [{
        title: 'Spots',
        glyph: 72,
        html: "KitchenSink.DummyText.longText"
    }, {
        title: 'Transit',
        glyph: 117,
        html: "KitchenSink.DummyText.extraLongText"
    }, {
        title: 'Places',
        glyph: 85,
        html: "KitchenSink.DummyText.longText"
    }, {
        title: 'Profile',
        glyph: 42,
        html: "KitchenSink.DummyText.extraLongText"
    }]
	
});