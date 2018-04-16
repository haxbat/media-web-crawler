const { get } = require('axios');
const { get: getCrawler } = require('../services/crawler-service');

const { FOX_CRAWLER_ID } = require('../config');

(async function () {
  const crawler = await getCrawler(FOX_CRAWLER_ID);
  const executionResults = await get(crawler.data.lastExecutionFixedResultsUrl);
  console.log('executionResuls', executionResults);
  console.log('executionResuls length', executionResults.data.length);
  // todo: save in MySql
})();
