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

etsyApp.userName = null;
etsyApp.userLocation = null;

//************************************************************************
//							ETSY APP FUNCTIONS
//************************************************************************

// We have 4 categories of Etsy Products: Tech, Apprel, Home, Leisure/Craft
etsyApp.categories = {
	tech: {
		keywords: ["Audio","Cameras","Gadgets","Decals and Skins","Cumputers & Peripherals","Video Games"]
	},
	home: {
		keywords: ["Painting", "Photography", "Sculpture", "candles", "Bathroom", "Bedding", "Furniture", "Home Appliances", "Home Decor", "Lighting", "Outdoor & Gardening"]
	},
	fashion: {
		keywords: ["mittens", "scarves", "caps", "sunglasses", "eyewear", "backpacks","messenger bags", "wallets", "hair care", "spa & relaxation"]
	},
	leisure: {
		keywords: ["drawing", "prints", "Drawings", "spa", "skin care", "collectibles", "movies", "books"]
	}
}

etsyApp.getUserName = function() {
		// get the name of the recipient
		etsyApp.userName = $('#name').val();

		//place the username on the page where appropriate for the questions
		$('span.reciName').text(etsyApp.userName);

		//get the location of the hand-made products to search for
		etsyApp.userLocation = $('#location').val();	

};

//results from the quiz pushed into  this object array
etsyApp.playerSearchObject = [];

//etsy app array of items
etsyApp.results = [];

etsyApp.getEtsyArrays = function() {
		$.each(etsyApp.playerSearchObject, function(i, keyword) { 
			$.ajax({
				url: 'http://proxy.hackeryou.com',
				method: "GET",
				dataType: "json",
				data: {
					reqUrl:  etsyApp.url + "/featured_treasuries/listings",
					params: {
						format: "json",
						api_key: etsyApp.apiKey,
						location: etsyApp.userLocation,
						limit: 50,
						tags: keyword
					}
				}
			}).then(function(response) {
				var items = response.results;
				etsyApp.results.push(items);
				etsyApp.createEtsyItems();
			});
		});
}


etsyApp.createEtsyItems = function() {
	var randomNumberArray = [Math.floor(Math.random() * etsyApp.playerSearchObject.length),
							Math.floor(Math.random() * etsyApp.playerSearchObject.length),
							Math.floor(Math.random() * etsyApp.playerSearchObject.length)];
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
			etsyApp.displayItems(response, chosenItem);
		}); //end of ajax call
		//delete the item from the array
		etsyApp.results[number].splice(randomNumber, 1);
	}); //end of each

}

etsyApp.displayItems = function(response, chosenItem) {
	var resultCard = {
		title: chosenItem.title,
		image: response.results[0].url_fullxfull,
		price: chosenItem.price,
		shopUrl: chosenItem.url
	};
	//run the template
	// ***** Handle Bar Template ***** 
	var resultCardHtml = $('#itemTemplate').html();
	var template = Handlebars.compile(resultCardHtml);

	$('.resultContainer').append(template(resultCard) );
}
etsyApp.getKeywords = function(button) {

	
};

//************************************************************************
//									INTERACTING WITH THE DOM
//************************************************************************
etsyApp.showQuestion = function () {
	$('.question1').fadeIn("slow");
}

etsyApp.showNextQuestion = function(button) {
	var desiredParent = $(button).parents(".question");
	var desiredParentClass = (desiredParent[0].classList[1]);
	var newQuestionNumber = ".question" + (parseInt(desiredParentClass[8]) + 1);
	$(newQuestionNumber).fadeIn("slow");
}

//************************************************************************
//									ON EVENT HANDLERS
//************************************************************************
//on form submit
etsyApp.onSubmitAnswers= function() {
	$('.form-submit-answers').on('submit', function(e) {
		console.log("success!");
		//grab three items from each array random
		e.preventDefault();
		etsyApp.getEtsyArrays();
	}); //end of on submit
}
etsyApp.onRadioClick = function() {
	$('input[type=radio]').on('click', function() {

		var selectedCategory = $(this).val();
		var selectedKeywords = etsyApp.categories[selectedCategory].keywords;
		var randomKeyword = selectedKeywords[Math.floor(Math.random()* selectedKeywords.length)];
		etsyApp.playerSearchObject.push(randomKeyword);

		etsyApp.showNextQuestion(this);
	});
}

etsyApp.onFormStart = function() {
	$('.form-start').on('submit', function(e) {
		e.preventDefault();
		etsyApp.getUserName();
		etsyApp.showQuestion();
	}); //end of submit
}

//************************************************************************
//									ETSY APP INIT FUNCTION
//************************************************************************
etsyApp.init = function() {
	etsyApp.onFormStart();
	etsyApp.onRadioClick();
	etsyApp.onSubmitAnswers();
}
