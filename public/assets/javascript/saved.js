$(document).ready(function () {
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", handleArticleDelete());
    $(document).on("click", ".btn.notes", handleArticleNotes());
    $(document).on("click", ".btn.note-delete", handleNoteDelete());
    $(document).on("click", ".btn.save", handleNoteSave());

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true").then(function (data) {
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }
    function renderArticles(articles) {
        var articlePanels = [];
        for (let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }
    function createPanel(article) {
        var panel = $(
            [
                "<div>",
                "<h3>",
                article.headline,
                "</h3>",
                "<div>",
                article.link,
                "</div>",
                "</div>",
            ].join("")
        );
        panel.data("_id", article._id);
        return panel;
    }
    function renderEmpty() {
        var emptyAlert = $("<h3>There are no articles to display</h3>");
        articleContainer.append(emptyAlert);
    }
}
