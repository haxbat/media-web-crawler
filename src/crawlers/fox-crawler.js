module.exports = {
  customId: 'exponenta_fox_article',
  startUrls: [
    {
      value: 'http://www.foxnews.com/',
    },
  ],
  crawlPurls: [
    {
      value: 'http://www.foxnews.com/[(\\w)+/2018/04/.+]',
    },
    {
      value: 'http://www.foxnews.com/[(\\w)+/2018/03/(1[5-9])|(2[0-9])|(3[0-9])/.+]',
    },
  ],
  pageFunction: pageFunction.toString(),
  loadCss: false,
  loadImages: false,
  ignoreRobotsTxt: true,
  disableWebSecurity: true,
  clickableElementsSelector: 'a:not([rel=nofollow])',
  finishWebhookUrl: 'https://nvq99qu2s7.execute-api.eu-central-1.amazonaws.com/dev/get-last-execution'
};

function pageFunction(context) {
  const $ = context.jQuery;

  const iframe = $('.param-messagesCount', $('.sppre_frame-container iframe').contents());

  return {
    title:            $('meta[name="dc.title"]').attr('content'),
    content:          $('.article-body').text().replace(/\s+/g,' '),
    author:           $('meta[name="dc.creator"]').attr('content'),
    publication_date: $('meta[name="dc.date"]').attr('content'),
    comments_count:   iframe.length
      ? iframe[0].innerHTML.replace(',','').replace('.','')
      : null
  };
}
