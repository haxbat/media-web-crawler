const { run } = require('../services/crawler-service');

const { FOX_CRAWLER_ID } = require('../config');

exports.handler = async (event, context, callback) => {
  // todo: add logic "if 402 is returned, crawler is already working"
  const response = await run(FOX_CRAWLER_ID);
  console.log('response', response);
  callback(null, 'success');
};
