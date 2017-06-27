// Add more seacrh bar
		$("#adding-button").on("click", function(event) {
			event.preventDefault();

			var newButton = $("#api-input").val().trim();
			var oneButton = $("<button>");
			if (newButton == "") {
				return 0;
			} else {oneButton.attr("data-person", newButton);
					oneButton.text(newButton);
					oneButton.addClass("inputPerson");
					$("#person-button").prepend(oneButton);

			}

			oneButton.attr("data-oerson", newButton);
			oneButton.text(newButton);
			oneButton.addClass("inputPerson");
			$("#person-button").prepend(oneButton);

			console.log(newButton);
			console.log(oneButton);

	});
	// Event listener for all button elements
	$("button").on("click", function() {
		// In this case, the "this" keyword refers to the button that was clicked
		var person = $(this).attr("data-person");

		// Constructing a URL to search Giphy for the name of the person who said the quote
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		person + "&api_key=dc6zaTOxFJmzC&limit=4";
		$("#gifs-appear-here").empty();

		// Performing our AJAX GET request
		$.ajax({
		url: queryURL,
		method: "GET"
		})
		// After the data comes back from the API
		.done(function(response) {
		// Storing an array of results in the results variable
		var results = response.data;

			// Looping over every result item
			for (var i = 0; i < results.length; i++) {

				// Only taking action if the photo has an appropriate rating
				if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				// Creating a div with the class "item"
				var gifDiv = $("<div class='item'>");

				// Storing the result item's rating
				var rating = results[i].rating;

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + rating);

				// Creating an image tag
				var personImage = $("<img class='myPerson'>");

				// Giving the image tag an src attribute of a proprty pulled off the
				// result item
				personImage.attr("src", results[i].images.fixed_height.url);
              	personImage.attr("data-animate", results[i].images.fixed_height.url);
              	personImage.attr("data-still", results[i].images.fixed_height_still.url);
              	personImage.attr("data-state", "animate");

				// Appending the paragraph and personImage we created to the "gifDiv" div we created
				gifDiv.prepend(p);
				gifDiv.prepend(personImage);

			// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
			$("#gifs-appear-here").append(gifDiv);
			}
			}
		});
	});
	//Pause function
		$(document).on("click", ".myPerson", function() {
      		var state = $(this).data("state");
      			if (state === "still") {
        			$(this).attr("src", $(this).attr("data-animate"));
         			 $(this).data("state","animate");
      			} else {
        			$(this).attr("src", $(this).attr("data-still"));
          			$(this).data("state", "still");
      			}
       });
