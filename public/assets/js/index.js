$(document).ready( function() {

    $(document).on("click", ".save-it", function() {
        let saveId = $(this).attr("data-id");
        console.log(`saveId: ${saveId}`);
        $.ajax({
            method: "POST",
            url: "/articles/" + saveId
            })
        .then(function(data) {
            console.log(data);
        });
    });

    $("#scrapeCnbc").on("click", function() {
        $.ajax({
            method: "GET",
            url: "/api/fetchCNBC"
            })
        .done(function(res) {
            if (res.success) {
                window.location.reload();
            }
        });
    });

    $("#scrapeFbn").on("click", function() {
        $.ajax({
            method: "GET",
            url: "/api/fetchFBN"
            })
        .done(function(res) {
            if (res.success) {
                window.location.reload();
            }
        });
    });

    $("#scrapedClear").on("click", function() {
        $.ajax({
            method: "DELETE",
            url: "/articles/"
            })
        .done(function(res) {
            if (res.success) {
                window.location.reload();
            }
        });
    });

    


})