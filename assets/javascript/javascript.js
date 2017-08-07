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
	
	//emptying the button DIV in order to rmeove the chance of duplicates
	$("#buttonDiv").empty();

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

	//creating on click function for the generation of new buttons
	$("#addChar").on("click", function() {

		//stops the default action of an element from happening
		event.preventDefault();

		//storing the name entered in as a variable
		var character = $("#charValue").val().trim();

		//pushing the character variable to the character array
		characterArray.push(character)

		//running the buttonCreate function to post all the old variables and the new variable as well
		buttonCreate();		
	})
}


//calling the buttonCreate function in order to create buttons on page load
buttonCreate()


//creating on click event for the buttons to pull gifs
$(document.body).on("click", ".button", function() {

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

	//Once response is finished start our function which will grab and post our gifs
	.done(function(response) {

		//saving the data from our response into a variable
		var results = response.data;

		//beginning a loop which will post our gifs
		for (var i = 0; i<results.length; i += 1) {

			//Creating a div variable which we will use for each specific gif
			var gifDiv = $("<div>")

			//Creating a paragraph element which will store our gif's rating
			var p = $("<p>").text("Rating: " + results[i].rating);

			//Creating an image element which we will use for each gif's image
			var characterImage = $("<img>");

			//giving our image the source from our results variable associated with the correct GIF in the loop
			characterImage.attr("src", results[i].images.fixed_height_still.url);

			//giving our image the still attribute.  Used for switching between animated/still state
			characterImage.attr("data-still", results[i].images.fixed_height_still.url)

			//giving our image the animate attribute.  Used for switching between animated/still state
			characterImage.attr("data-animate", results[i].images.fixed_height.url)

			//Giving our image the images class.  Used for formatting and adding click events
			characterImage.addClass("images")

			//giving our image the state attribute.  Used for flipping between animated and stills states
			characterImage.attr("data-state", "still")

			//appending the paragraph element to the gif div
			gifDiv.append(p);

			//appending the image element to the gif div
			gifDiv.append(characterImage);

			//prepending our images to the gif container
			$("#gifSection").prepend(gifDiv);
		}
	})

})



//creating a function to switch between the static/animated state on generated images
$(document.body).on("click", ".images", function() {

	//creating if/else statement related to the data-state of the selected image
	var state = $(this).attr("data-state")

	//if the state is still run the following function
	if (state === "still") {

		//giving the source the animated source url
		$(this).attr("src", $(this).attr("data-animate"));

		//switching the data-state to animate
		$(this).attr("data-state", "animate");
	}	else {

		//giving the source the still source url
		$(this).attr("src", $(this).attr("data-still"));

		//switching the data-state to still
		$(this).attr("data-state", "still")
	}
})

// $(document.body).on("click", ".images" function() {
// 	alert("test")
