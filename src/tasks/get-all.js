const { getAll } = require('../services/crawler-service');

(async function () {
  const crawlers = await getAll();
  console.log('crawlers', crawlers);
})();
