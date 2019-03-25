($(function() {
    var recordCount;
  
    $('#run-search').click(function(event) {
      event.preventDefault();
  
      var url = buildUrl();
  
      $.ajax({
        url: url,
        method: 'GET'
      }).then(displayArticles);
  
    });
  
    function buildUrl() {
      var API_KEY = 'R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M';
      var BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  
      var params = {
        'api-key': API_KEY
      };
  
      var term = $('#search-term').val().trim();
      params.q = term;
  
      var startYear = $('#start-year').val().trim();
      if(startYear.length === 4) {
        params.start_year = startYear + '0101';
      }
  
      var endYear = $('#end-year').val().trim();
      if(endYear.length === 4) {
        params.end_year = endYear + '1231';
      }
  
      return BASE_URL + $.param(params);
    }
  
    function displayArticles(NYTData) {
      var docs = NYTData.response.docs;
  
      docs.forEach(displayArticle);
    }
  
    function displayArticle(doc) {
      var article = createArticle(doc);
      $('#article-section').append(article);
    }
  
    function createArticle(doc) {
      console.log(doc);
      var headline = $('<h3>').text(doc.headline.print_headline);
      var byLine = $('<p>').text(doc.byline.original);
      var date = doc.pub_date;
      var byLineDate = $('<span>').text(`- published: ${date}`);
      byLine.append(byLineDate);
      var snippet = $('<p>').text(doc.snippet);
      var source = $('<a>').attr('href', doc.web_url).text('Read more...');
      var article = $('<article>').append(headline, byLine, snippet, source);
      return article;
    }
  }));