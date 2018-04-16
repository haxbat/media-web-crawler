const { update } = require('../services/crawler-service');

const foxCrawler = require('../crawlers/fox-crawler');

const { FOX_CRAWLER_ID } = require('../config');

(async function() {
  const response = await update(FOX_CRAWLER_ID, foxCrawler);
  console.log('response', response);
})();
