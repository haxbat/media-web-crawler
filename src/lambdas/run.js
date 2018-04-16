const { run } = require('../services/crawler-service');

const { FOX_CRAWLER_ID } = require('../config');

exports.handler = async () => {
  const response = await run(FOX_CRAWLER_ID);
  console.log('response', response);
};
