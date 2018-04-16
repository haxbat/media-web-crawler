const { getAll, create, deleteCrawler } = require('../services/crawler-service');

const foxCrawler = require('../crawlers/fox-crawler');

(async function () {
  let response;
  try {
    response = await create(foxCrawler);
  } catch (error) {
    const crawlers = await getAll();
    const crawler = crawlers.find(c => c.customId === foxCrawler.customId);
    await deleteCrawler(crawler._id);
    response = await create(foxCrawler);
  }

  console.log('response', response);
})();

