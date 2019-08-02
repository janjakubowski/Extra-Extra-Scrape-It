const isHomePage = true;

function initPage() {
    articleContainer.empty();
    $.get("/api/articles/saved=false")
        .then( data => {
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            };
        });
};

function renderArticles(articles) {
    let articleDisplay = [];
    articles.array.forEach( article =>  
        articleDisplay.push(createItem(article));
    )
};

function createItem(article) {
    var item = $([ 
        "<div>",

        "</div>"

    ]);
};

function renderEmpty() {
    const emptyMessage = "<h1>no existing articles</h1>";
    articleContainer.append(emptyMessage);
};

$(document).ready( () => {

    const articleContainer = $(".article-container");

    $(document).on("click", "btn.save", handleArticleSave);
    $(document).on("click", "btn.scrape-cnbc", handleScrapeCnbc);
    $(document).on("click", "btn.scrape-fbn", handleScrapeFbn);

    


})