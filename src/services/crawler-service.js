const { get, post, put, delete: deleteRequest } = require('axios');

const { TOKEN, BASE_URL } = require('../config');

module.exports = {
  get: getCrawler,
  getAll,
  create,
  update,
  deleteCrawler,
  run,
};

async function getCrawler(crawlerId) {
  const url = `${BASE_URL}/crawlers/${crawlerId}?token=${TOKEN}`;
  return await get(url);
}

async function getAll() {
  const url = `${BASE_URL}/crawlers?token=${TOKEN}`;
  return (await get(url)).data;
}

async function create(crawler) {
  const url = `${BASE_URL}/crawlers?token=${TOKEN}`;
  return await post(url, crawler);
}

async function update(crawlerId, crawler) {
  const url = `${BASE_URL}/crawlers/${crawlerId}?token=${TOKEN}`;
  return await put(url, crawler);
}

async function deleteCrawler(crawlerId) {
  const url = `${BASE_URL}/crawlers/${crawlerId}?token=${TOKEN}`;
  return await deleteRequest(url);
}

async function run(crawlerId) {
  const url = `${BASE_URL}/crawlers/${crawlerId}/execute?token=${TOKEN}`;
  return await post(url);
}
