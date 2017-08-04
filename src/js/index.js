$(document).ready(function() {
  //Links the user to a random Wikipedia Entry
  $("#randomB").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  //Searchs for Wikipedia entries similar to what the user has
  //searched for
  $("#searchB").click(function() {
    //Gets search term, and performs the API call for 10 entries
    //related to the search term
    if ($("#search").val()) {
      var titles = [];
      $(".container2").css({ top: "-20px", "transition-duration": ".7s" });
      var searchTerm = $("#search").val();
      var site =
        " https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&generator=search&gsrsearch=" +
        searchTerm +
        "&exlimit=max&exintro";

      //API Call
      $.ajax({
        url: site,
        success: function(data) {
          var titles = [];
          var description = [];
          var keys = [];

          keys = $.map(data.query.pages, function(v, i) {
            return i;
          });

          // Organizes the list of entries returned by the API call
          for (var i = 0; i < keys.length; i++) {
            titles[data.query.pages[keys[i]].index - 1] =
              data.query.pages[keys[i]];
          }
          console.log(titles);

          // Empties the list and fills the list with the entries from the API
          $("#contentList").empty();
          for (var i = 0; i < titles.length; i++) {
            $("#contentList").append(
              "<li class='infoCard'><a href =https://en.wikipedia.org/?curid=" +
                titles[i].pageid +
                " target=blank><h3>" +
                titles[i].title +
                "</h3><p>" +
                titles[i].extract +
                "</p></a></li>"
            );
          }
        }
      });
    }
  });

  //Clears the form field and removes list items from the screen
  $("#clearForm").click(function() {
    $("#contentList").empty();
    $("#search").val("");
    $(".container2").css({ top: "150px", "transition-duration": ".7s" });
  });
});
