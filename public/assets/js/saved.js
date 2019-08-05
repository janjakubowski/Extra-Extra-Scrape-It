$(document).ready( function() {

    $(document).on("click", ".delete-it", function() {
        let deleteId = $(this).attr("data-id");
        console.log(`deleteId: ${deleteId}`);
        $.ajax({
            method: "DELETE",
            url: "/saved/" + deleteId
            })
        .done(function(res) {
            if (res.success) {
                window.location.reload();
            };
        });
    });
    
    $(document).on("click", ".note-it", function() {


        console.log("ROUTING IT !!!");
    
    //     var articleId = $(this).attr("data-id");

    //     // Now make an ajax call for the Article
    //     $.ajax({
    //         method: "GET",
    //         url: "/articles/" + articleId
    //     })
    //         // With that done, add the note information to the page
    //         .then(function(data) {
    //         console.log(data);
    //         // The title of the article
    //         $("#notes").append("<h2>" + data.title + "</h2>");
    //         // An input to enter a new title
    //         $("#notes").append("<input id='titleinput' name='title' >");
    //         // A textarea to add a new note body
    //         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    //         // A button to submit a new note, with the id of the article saved to it
    //         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    //         // If there's a note in the article
    //         if (data.note) {
    //             // Place the title of the note in the title input
    //             $("#titleinput").val(data.note.title);
    //             // Place the body of the note in the body textarea
    //             $("#bodyinput").val(data.note.body);
    //         }
    //         });
    // });

    // $("#addNote").on("click", function(e) {
  
    //     e.preventDefault();
    //     let articleId = $(this).attr("data-id");
    //     let message = $("#noteTxt").val().trim();

    //     $.ajax({
    //         method: "POST",
    //         url: "/api/notes",
    //         data: {
    //             articleId,
    //             message
    //             }
    //         })
    //     .done(function(res) {
    //         if (res.success) {
    //             window.location.reload();
    //         };
    //     });
    });
});