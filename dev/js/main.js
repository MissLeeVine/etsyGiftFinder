//************************************************************************
//								DOCUMENT READY
//************************************************************************
$(function() {
	etsyApp.init();
});	

//************************************************************************
//							ETSY OBJECT		
//************************************************************************
var etsyApp = {};

etsyApp.apiKey = 'ao3boag2j9soanucuqyhk53i';
etsyApp.url = 'https://openapi.etsy.com/v2';

etsyApp.userName;
etsyApp.userLocation;

// We have 4 categories of Etsy Products: Tech, Apprel, Home, Leisure/Craft
etsyApp.categories = {
	tech: {
		keywords: ["Audio","Cameras","Gadgets","Decals and Skins","Cumputers & Peripherals","Video Games"]
	},
	home: {
		keywords: ["Painting", "Photography", "Sculpture", "candles", "Bathroom", "Bedding", "Furniture", "Home Appliances", "Home Decor", "Lighting", "Outdoor & Gardening"]
	},
	apparel: {
		keywords: ["mittens", "scarves", "caps", "sunglasses", "eyewear", "backpacks","messenger bags", "wallets", "hair care", "spa & relaxation"]
	},
	leisure: {
		keywords: ["drawing", "prints", "Drawings", "spa", "skin care", "collectibles", "movies", "books"]
	}
}

etsyApp.location = "Toronto";

//results from the quiz pushed into  this object array
etsyApp.playerSearchObject = ["candles", "anklets", "cats", "stone", "eyewear"];

etsyApp.results = [];

etsyApp.getEtsyItems = function() {
		$.each(etsyApp.playerSearchObject, function(i, keyword) { 
			$.ajax({
				url: 'http://proxy.hackeryou.com',
				method: "GET",
				dataType: "json",
				data: {
					reqUrl:  etsyApp.url + "/listings/active",
					params: {
						format: "json",
						api_key: etsyApp.apiKey,
						findAllListingsActive: "toronto",
						limit: 50,
						tags: keyword
					}
				}
			}).then(function(response) {
				var items = response.results;
				etsyApp.results.push(items);
			});
		});
}

//on form submit
etsyApp.displayItems = function() {
	$('.input-start').on('submit', function(e) {
		//grab three items from each array random
		e.preventDefault();
		var randomNumberArray = [Math.floor(Math.random() * etsyApp.playerSearchObject.length),
																	Math.floor(Math.random() * etsyApp.playerSearchObject.length),
																	Math.floor(Math.random() * etsyApp.playerSearchObject.length)];
		console.log(randomNumberArray);
		//for each array in etsyApp.results
		$.each(randomNumberArray, function(i, number) {
			//create a random number
			var randomNumber = Math.floor(Math.random() * etsyApp.results[number].length);
			//choose an item using that random number
			var chosenItem = etsyApp.results[number][randomNumber];
			console.log(chosenItem);
			//get the image for the chosen item
			var chosenItemImage = $.ajax({
				url:  'http://proxy.hackeryou.com',
				method: "GET",
				dataType: "json",
				data: {
					reqUrl: etsyApp.url + "/listings/" + chosenItem.listing_id + "/images",
					params: {
						format: "json",
						api_key: etsyApp.apiKey,
					}
				}
			}).then(function(response){ 
				// console.log(response.results);
				var title = chosenItem.title;
				var image = response.results[0].url_fullxfull;
				var price = chosenItem.price;
				var shopUrl = chosenItem.url;
			//run the template
			}); //end of ajax call
			//delete the item from the array
			etsyApp.results[number].splice(randomNumber, 1);
		}); //end of each

	}); //end of on submit
}
etsyApp.init = function() {
	etsyApp.getEtsyItems();
	etsyApp.displayItems();
}

// On click, apply the class selected, grab the data of the class selected

// Use selected data to roll a result on the corresponding array

// push results into an selected choice array
// if there is a repeated keyword, filter out the duplicate 

// On submit location form, grab location data 

// request ajax results from the selected choice array
// pass in location data 

// display results

