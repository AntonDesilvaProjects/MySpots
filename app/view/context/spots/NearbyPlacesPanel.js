Ext.define('MySpots.view.context.spots.NearbyPlacesPanel',{
	extend : 'Ext.container.Container',
	alias : 'widget.nearbyPlacesPanel',
	requires : [
		'MySpots.fwk.map.GoogleMapsConstants',
		'MySpots.model.context.spots.NearbyPlacesModel'
	],
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	padding : 10,
	viewModel : {
		data : {
			placeType : '',
			radius : 25000,
			openNow : true,
			keyword : ""
		},
		formulas : {
			
			updateSearchResults : function( get )
			{
				var searchFilters = {};
				searchFilters.type = get('placeType');
				searchFilters.openNow = get('openNow');
				searchFilters.keyword = get('keyword');

				console.log( 'current filters ');
				console.log( searchFilters );

				var  contextController = this.getView().up('spotsContextPanel').getController();
				contextController.getNearbyPlaces( null, get('radius'), searchFilters );
			},
			filterClass : function( get )
			{
				var cls = undefined;
				var isFilterDirty = get('placeType') !== 'subway_station' || get('radius') !== 25000 || get('openNow') !== true;
				if( isFilterDirty )
					cls = 'fas fa-filter filter-dirty';
				else
					cls = 'fas fa-filter';

				this.getView().updateSearchBarTriggerCls( cls );

			},
		},
		stores : {
			placeTypeStore : {
				fields : [
					'name', 'value'
				],
				data : MySpots.fwk.map.GoogleMapsConstants.getReadablePlaceTypes()
			},
			searchResultsStore : {
				model : 'MySpots.model.context.spots.NearbyPlacesModel'
			}
		}
	},
	initComponent : function()
	{
		var me = this;

		//Search components
		var filters = Ext.widget('panel',{
			layout : 'vbox',
			header : false,
			hidden : true,
			border : 1,
			width : '100%',
			items : [
				{
					xtype : 'combo',
					emptyText : 'Choose place type',
					padding : 5,
					fieldLabel : 'Place Type',
					displayField : 'name',
					valueField : 'value',
					typeAhead : true,
					forceSelection : true,
					minChars : 3,
					bind : {
						store : '{placeTypeStore}',
						value : '{placeType}'
					}
				},
				{
					xtype : 'slider',
					fieldLabel : 'Radius(m)',
					padding : 5,
					minValue : 1,
					maxValue : 50000,
					width : '100%',
					bind : {
						value : '{radius}'
					}
				},
				{
					xtype : 'checkbox',
					padding : 5,
					boxLabel : 'Open now?',
					bind : {
						value : '{openNow}'
					}
				}
			],
			tbar : [
				{
					xtype : 'tbfill'
				},
				{
					iconCls : 'fa fa-close',
					xtype : 'button',
					handler : function( btn )
					{
						btn.up('panel').hide();
					}
				}
			]
		});

		var searchBar = Ext.widget('textfield', {
			reference : 'nearbyPlacesSearchBar',
			itemId : 'searchBar',
			emptyText : 'Search for nearby places...',
			triggers : {
				picker : {
					cls : 'fas fa-filter',
					handler : function( combo )
					{
						if( filters.isVisible() )
							filters.hide();
						else
							filters.show();
					}
				}
			},
			bind : {
				value : '{keyword}'
			}
		});


		var searchResultsGrid = Ext.widget( 'grid', {
			reference : 'searchResultsGrid',
			bind : {
				store : '{searchResultsStore}'
			},
			columns : [
				{
					text : '',
					dataIndex : 'icon',
					flex : 1,
					renderer : function( value )
					{
						return Ext.String.format('<img src="{0}" width="25px" height="25px"/>', value );
					}
				},
				{
					text : 'Name',
					dataIndex : 'name',
					flex : 3,
				},
				{
					text : 'Position',
					dataIndex : 'latlng',
					flex : 2
				}
			]
		});

		me.items = [
			searchBar,
			filters,
			searchResultsGrid
		];
		me.callParent( arguments );
	},
	updateSearchBarTriggerCls : function( cls )
	{
		var me = this;
		console.log( me.down('#searchBar').getTriggers());
		me.down('#searchBar').getTriggers().picker.el.dom.className +=cls ;
	}
});