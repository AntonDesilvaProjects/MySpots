Ext.define('MySpots.view.main.MainPage',{
	extend : 'Ext.tab.Panel',
	requires : [
	],

	alias : 'widget.contentTabPanel',
	ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    tabPosition : 'left',

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
           text: 'My Spots',
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

   	responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    items: [{
        title: 'Home',
        glyph: 72,
        html: "KitchenSink.DummyText.longText"
    }, {
        title: 'Users',
        glyph: 117,
        html: "KitchenSink.DummyText.extraLongText"
    }, {
        title: 'Groups',
        glyph: 85,
        html: "KitchenSink.DummyText.longText"
    }, {
        title: 'Settings',
        glyph: 42,
        html: "KitchenSink.DummyText.extraLongText"
    }]
	
});