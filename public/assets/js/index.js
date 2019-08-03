// const isHomePage = true;

// function initPage() {
//     articleContainer.empty();
//     $.get("/api/articles/saved=false")
//         .then( data => {
//             if (data && data.length) {
//                 renderArticles(data);
//             } else {
//                 renderEmpty();
//             };
//         });
// };

// function renderArticles(articles) {
//     let articleDisplay = [];
//     articles.array.forEach( article =>  
//         articleDisplay.push(createItem(article))
//     );
// };

// function createItem(article) {
//     var item = $([ 
//         "<div>",

//         "</div>"

//     ]);
// };

// function renderEmpty() {
//     const emptyMessage = "<h1>no existing articles</h1>";
//     articleContainer.append(emptyMessage);
// };

// function handleScrapeCnbc() {
//     $.get("/api/fetchCNBC")
//         .then( () => {
//             console.log("completed");
//         });
// };

$(document).ready( function() {

    // const articleContainer = $(".article-container");

    $(document).on("click", ".save-it", function(e) {
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
        console.log("in index.js ready to do ajax")
        $.ajax({
            method: "GET",
            url: "/api/fetchCNBC"
            })
        .then(function(message) {
            console.log(`${message}`);
            })
    });
    // $(document).on("click", "btn.scrape-fbn", handleScrapeFbn);

    


})