/* 
CREATE AN ARRAY OF STRINGS RELATED TO GAME OF THRONES CHARACTERS - Done
CREATE BUTTONS FOR THE TOPICS IN THIS ARRAY ISING A FOR LOOP - Done
CREATE ONCLICK EVENTS FOR EACH BUTTON THAT IS CLICKED.
THE ONCLICK EVENT WILL TRIGGER GIFS TO LOAD
CREATE ONCLICK EVENTS FOR EACH INDIVIDUAL GIF THAT LOADS THAT WILL SWITCH THE STATE FROM ANIMATED TO STATIC
CREATE A FORD THAT WILL ADD NEW BUTTONS TO THE PAGE
*/

//----------------------------------VARIABLES--------------------------------------------------------------
var characterArray = ["Daenerys Targaryen", "Jon Snow", "Tyrion Lannister", "Sansa Stark", "Arya Stark", "Cersei Lanniser", "Joffrey Baratheon", "Ramsay Bolton", "Sandor Clegane", "Hodor", "Brienne of Tarth", "Petyr Baelish", "Jaime Lannister", "Eddard Stark", "Samwell Tarly"]

var buttonDiv = $("#buttonDiv");

var apiURL = "http://api.giphy.com/v1/gifs/search?q=";

var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";






//----------------------------------FUNCTIONS---------------------------------------------------------------

//Functin for looping through characterArray and creating initial set of buttons
function buttonCreate () {
	
	//initiating loop
	for (var i = 0; i < characterArray.length; i += 1) {
		
		//creating class used to create each individual button
		var buttonClass = $("<button>");

		//adding the characters name as a data attribute
		buttonClass.attr('data-name', characterArray[i]);

		//adding class to the button for CSS properties
		buttonClass.addClass("button")

		//updating the button to include the characters name on it
		buttonClass.html(characterArray[i]);

		//appending the button to the div class for the button container
		buttonDiv.append(buttonClass);
	}
}

//calling the buttonCreate function in order to creaet buttons
buttonCreate()


//creating on click event for the buttons to pull gifs
$(".button").on("click", function() {

	//Logging the data name of the button clicked and saving it to a variable
	var name = $(this).attr("data-name")

	//creating url in which to call the api.  Contains the name of the button clicked.
	var queryURL = apiURL + name + apiKey;

	//Starting ajax command in order to hit API and retrieve information
	$.ajax({
		
		//hitting the url created above
		url: queryURL,

		//using the get method in order to pull information
		method: "GET"
	})
	//
	.done(function(response) {
		var results = response.data;
		console.log(response);
		for (var i = 0; i<results.length; i += 1) {
			var gifDiv = $("<div>")
			var p = $("<p>").text("Rating: " + results[i].rating);
			var characterImage = $("<img>");
			characterImage.attr("src", results[i].images.fixed_height_still.url);
			characterImage.attr("data-still", results[i].images.fixed_height_still.url)
			characterImage.attr("data-animate", results[i].images.fixed_height.url)
			characterImage.addClass("images")
			characterImage.attr("data-state", "still")
			gifDiv.append(p);
			gifDiv.append(characterImage);
			$("#gifSection").prepend(gifDiv);
		}
	})

})

$(".images").on("click", function() {
		alert("test");
})


// $(".gif").on("click", function() {
// 	alert("test")
// 	var state = $(this).attr("data-state")
// 	if (state === "still") {
// 		$(this).attr("src", $(this).attr("data-animate"));
// 		$(this).attr("data-state", "animate");
// 	}	else {
// 		$(this).attr("src", $(this).attr("data-still"));
// 		$(this).attr("data-state", "still")
// 	}
// })