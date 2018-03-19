Ext.define('MySpots.fwk.map.GoogleMapsConstants',{
	singleton : true,
	requires : [
		'MySpots.fwk.util.StringUtils'
	],
	placeTypes : {
	  	"ACCOUNTING": "accounting",
		"AIRPORT": "airport",
		"AMUSEMENT_PARK": "amusement_park",
		"AQUARIUM": "aquarium",
		"ART_GALLERY": "art_gallery",
		"ATM": "atm",
		"BAKERY": "bakery",
		"BANK": "bank",
		"BAR": "bar",
		"BEAUTY_SALON": "beauty_salon",
		"BICYCLE_STORE": "bicycle_store",
		"BOOK_STORE": "book_store",
		"BOWLING_ALLEY": "bowling_alley",
		"BUS_STATION": "bus_station",
		"CAFE": "cafe",
		"CAMPGROUND": "campground",
		"CAR_DEALER": "car_dealer",
		"CAR_RENTAL": "car_rental",
		"CAR_REPAIR": "car_repair",
		"CAR_WASH": "car_wash",
		"CASINO": "casino",
		"CEMETERY": "cemetery",
		"CHURCH": "church",
		"CITY_HALL": "city_hall",
		"CLOTHING_STORE": "clothing_store",
		"CONVENIENCE_STORE": "convenience_store",
		"COURTHOUSE": "courthouse",
		"DENTIST": "dentist",
		"DEPARTMENT_STORE": "department_store",
		"DOCTOR": "doctor",
		"ELECTRICIAN": "electrician",
		"ELECTRONICS_STORE": "electronics_store",
		"EMBASSY": "embassy",
		"FIRE_STATION": "fire_station",
		"FLORIST": "florist",
		"FUNERAL_HOME": "funeral_home",
		"FURNITURE_STORE": "furniture_store",
		"GAS_STATION": "gas_station",
		"GYM": "gym",
		"HAIR_CARE": "hair_care",
		"HARDWARE_STORE": "hardware_store",
		"HINDU_TEMPLE": "hindu_temple",
		"HOME_GOODS_STORE": "home_goods_store",
		"HOSPITAL": "hospital",
		"INSURANCE_AGENCY": "insurance_agency",
		"JEWELRY_STORE": "jewelry_store",
		"LAUNDRY": "laundry",
		"LAWYER": "lawyer",
		"LIBRARY": "library",
		"LIQUOR_STORE": "liquor_store",
		"LOCAL_GOVERNMENT_OFFICE": "local_government_office",
		"LOCKSMITH": "locksmith",
		"LODGING": "lodging",
		"MEAL_DELIVERY": "meal_delivery",
		"MEAL_TAKEAWAY": "meal_takeaway",
		"MOSQUE": "mosque",
		"MOVIE_RENTAL": "movie_rental",
		"MOVIE_THEATER": "movie_theater",
		"MOVING_COMPANY": "moving_company",
		"MUSEUM": "museum",
		"NIGHT_CLUB": "night_club",
		"PAINTER": "painter",
		"PARK": "park",
		"PARKING": "parking",
		"PET_STORE": "pet_store",
		"PHARMACY": "pharmacy",
		"PHYSIOTHERAPIST": "physiotherapist",
		"PLUMBER": "plumber",
		"POLICE": "police",
		"POST_OFFICE": "post_office",
		"REAL_ESTATE_AGENCY": "real_estate_agency",
		"RESTAURANT": "restaurant",
		"ROOFING_CONTRACTOR": "roofing_contractor",
		"RV_PARK": "rv_park",
		"SCHOOL": "school",
		"SHOE_STORE": "shoe_store",
		"SHOPPING_MALL": "shopping_mall",
		"SPA": "spa",
		"STADIUM": "stadium",
		"STORAGE": "storage",
		"STORE": "store",
		"SUBWAY_STATION": "subway_station",
		"SUPERMARKET": "supermarket",
		"SYNAGOGUE": "synagogue",
		"TAXI_STAND": "taxi_stand",
		"TRAIN_STATION": "train_station",
		"TRANSIT_STATION": "transit_station",
		"TRAVEL_AGENCY": "travel_agency",
		"VETERINARY_CARE": "veterinary_care",
	  	"ZOO": "zoo"
	},
	getReadablePlaceTypes : function()
	{
		var me = this;
		var readablePlaceTypes = [];
		Ext.Object.each( me.placeTypes, function( key, value ){
			var obj = {};
			var tempName = ' ' + key.toLowerCase();
			tempName = tempName.replace( "_", " ");
			for(var i = 0; i < tempName.length; i++)
				if( tempName.charAt(i) === ' ')
					tempName = MySpots.fwk.util.StringUtils.replaceAt( tempName, tempName.charAt( i + 1).toUpperCase(), i + 1 );
			
			obj.name = tempName.trim();
			obj.value = value;
			
			readablePlaceTypes.push( obj );
		});
		return readablePlaceTypes;
	}
});