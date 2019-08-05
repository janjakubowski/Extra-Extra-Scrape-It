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

        var articleId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + articleId
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
        
            $("#modalHeadline").text(data.headline);

            if (data.note) {
                $(".submit-note").text("Update Note");
                $(".submit-note").attr("data-id",data.note._id);
                $(".submit-note").show();
                $(".delete-note").attr("data-id",data._id);
                $(".delete-note").show();
                $("#noteTxt").val(data.note.message);
            } else {
                $(".submit-note").text("Add Note");
                $(".submit-note").attr("data-id",data._id);
                $(".submit-note").show();
                $(".delete-note").hide();
                $("#noteTxt").val("");
            };
            $("#modalNotes").modal("show");
        });
    });

    $(".submit-note").on("click", function(e) {
  
        e.preventDefault();

        let articleId = $(this).attr("data-id");
        let message = $("#noteTxt").val().trim();

        $.ajax({
            method: "POST",
            url: "/saved/" + articleId,
            data: {
                message
                }
            })
        .done(function(res) {
            if (res.success) {
                window.location.reload();
            };
        });
    });
});