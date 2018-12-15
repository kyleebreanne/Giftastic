var basicGirl = [
    "Mean Girls",
    "Gossip Girl",
    "90210",
    "Starbucks",
    "YASSS",
    "Clueless",
    "Riverdale",
];



    for(var i = 0; i < basicGirl.length; i++) {
        var button = $("<button>").text(basicGirl[i]);
        button.attr("data-basic", basicGirl[i]);
        button.addClass("basic-button");
        $("#yass-button").append(button);
    }

    $(".basic-button").on("click", function(){
			$("#cliche-group").empty();
		
	});
    
    
    $(document).on("click", ".basic-button", function() {
        var basic = $(this).attr("data-basic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        basic + "&api_key=F0k0r9Care4FEUB5IiaR70wSWq9HnO8R&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
           var results = response.data;
            console.log(response);

    
           var resultsContainerSection = $("<section class='results-container'>");
    
            for(var i = 0; i < results.length; i++) {
                var singleResultDiv = $("<div class='result-container'>");
                
                var rating = results[i].rating;
    
                var p = $("<p>").text("Rating: " + rating);
    
                var basicImg = $("<img class='result'>");
               basicImg.attr("src", results[i].images.fixed_height_still.url);
                basicImg.attr("data-state", "still");
                basicImg.attr("data-still", results[i].images.fixed_height_still.url);
               basicImg.attr("data-animate", results[i].images.fixed_height.url);
    
                singleResultDiv.prepend(basicImg);
                singleResultDiv.prepend(p);
    
                resultsContainerSection.prepend(singleResultDiv);
            }
    
            $("#cliche-group").prepend(resultsContainerSection);
        });
    });
    
    $(document).on("click", ".result", function() {
        var state = $(this).attr("data-state");
    
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");


        } if (state === 'animate') {

                $(this).attr('src' , $(this).attr('data-still'));
                $(this).attr('data-still' , 'still');

            }
        })