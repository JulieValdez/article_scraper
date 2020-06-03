$(document).ready(function () {
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave());
  $(document).on("click", ".scrape-new", handleArticleScrape());

  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/headlines").then(function (data) {
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

  function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;
    $.ajax({
      method: "POST",
      url: "api/headlines",
      data: articleToSave,
    }).then(function (data) {
      if (data.ok) {
        initPage();
      }
    });
  }
  function handleArticleScrape() {
    $.get("/api/fetch").then(function (data) {
      initPage();
      bootbox.alert("<h3>" + data.message + "</h3>");
    });
  }
});
