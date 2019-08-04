$(document).ready( function() {

    $(document).on("click", ".delete-it", function(e) {
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

})