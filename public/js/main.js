
// We have 4 categories of Etsy Products: Tech, Apprel, Home, Leisure/Craft
// We make an object including the 4 categories object,
// within the object, we have an array of keywords

// var categories = {
// 	tech: {
// 		keywords: []
// 	}

// 	home: {
// 		keywords: []
// 	}

// 	apparel: {
// 		keywords: []
// 	}

// 	leisure: {
// 		keywords: []
// 	}
// }

'use strict';

//************************************************************************
//								DOCUMENT READY
//************************************************************************

$(function () {
	etsyApp.init();
});

//************************************************************************
//							ETSY OBJECT		
//************************************************************************
var etsyApp = {};

etsyApp.apiKey = 'ao3boag2j9soanucuqyhk53i';
etsyApp.url = 'https://openapi.etsy.com/v2';

// We have 4 categories of Etsy Products: Tech, Apprel, Home, Leisure/Craft
etsyApp.categories = {
	tech: {
		keywords: ["Audio", "Cameras", "Gadgets", "Decals and Skins", "Cumputers & Peripherals", "Video Games"]
	},
	home: {
		keywords: ["Painting", "Photography", "Sculpture", "candles", "Bathroom", "Bedding", "Furniture", "Home Appliances", "Home Decor", "Lighting", "Outdoor & Gardening"]
	},
	apparel: {
		keywords: ["mittens", "scarves", "caps", "sunglasses", "eyewear", "backpacks", "messenger bags", "wallets", "hair care", "spa & relaxation"]
	},
	leisure: {
		keywords: ["drawing", "prints", "Drawing", "spa", "skin care", "collectibles", "movies", "books"]
	}
};

etsyApp.location = "Toronto";

//results from the quiz pushed into  this object array
etsyApp.playerSearchObject = ["candles", "mittens", "video games"];

etsyApp.getEtsyItems = function () {
	$.each(etsyApp.playerSearchObject, function (i, keyword) {
		$.ajax({
			url: 'http://proxy.hackeryou.com',
			method: "GET",
			dataType: "json",
			data: {
				reqUrl: etsyApp.url + "/listings/active",
				params: {
					format: "json",
					api_key: etsyApp.apiKey,
					findAllListingsActive: "toronto",
					limit: 50,
					tags: keyword
				}
			}
		}).then(function (data) {
			console.log(data);
		});
	});
};

etsyApp.init = function () {
	etsyApp.getEtsyItems();
};


// On click, apply the class selected, grab the data of the class selected

// Use selected data to roll a result on the corresponding array

// push results into an selected choice array
// if there is a repeated keyword, filter out the duplicate

// On submit location form, grab location data

// request ajax results from the selected choice array
// pass in location data

// display results

