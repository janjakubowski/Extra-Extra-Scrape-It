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
        articleDisplay.push(createItem(article))
    );
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

function handleScrapeCnbc() {
    $.get("/api/fetchCNBC")
        .then( data => {
            console.log("got the datar");
            // if (data && data.length) {
            //     renderArticles(data);
            // } else {
            //     renderEmpty();
            // };
        });
};

$(document).ready( () => {

    const articleContainer = $(".article-container");

    // $(document).on("click", "btn.save", handleArticleSave);
    $(".scrape-cnbc").on("click", handleScrapeCnbc);
    // $(document).on("click", "btn.scrape-fbn", handleScrapeFbn);

    


})