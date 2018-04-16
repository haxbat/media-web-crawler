module.exports = {
  customId: 'exponenta_fox_article',
  startUrls: [
    {
      value: 'http://www.foxnews.com/politics/2018/04/15/comey-trump-trade-shots-ahead-long-awaited-interview-book-release.html',
    },
  ],
  pageFunction: pageFunction.toString(),
  loadCss: false,
  loadImages: false,
  ignoreRobotsTxt: true,
  disableWebSecurity: true,
  clickableElementsSelector: null,
};

function pageFunction(context) {
  // called on every page the crawler visits, use it to extract data from it
  var $ = context.jQuery;

  var result = {
    publication_date: $('meta[name="dc.date"]').attr("content"),
    title:            $('meta[name="dc.title"]').attr("content"),
    author:           $('meta[name="dc.creator"]').attr("content"),
    content:          $( ".article-body" ).text(),
    comments_count:   $('.param-messagesCount', $('.sppre_frame-container iframe').contents())[0].innerHTML.replace(',','').replace('.','')
  };
  return result;
}
