const { get } = require('axios');
const { get: getCrawler } = require('../services/crawler-service');

const { FOX_CRAWLER_ID } = require('../config');

exports.handler = async (event, context, callback) => {
  const crawler = await getCrawler(FOX_CRAWLER_ID);
  const executionResults = await get(crawler.data.lastExecutionFixedResultsUrl);
  console.log('executionResuls length', executionResults.data.length);
  callback(null, `length of results is ${executionResults.data.length}`);
};
