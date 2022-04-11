const { deleteLocationAPI } = require('../api');
const url = require('url');
const { logger } = require('../utils');

const deleteLocation = async (req, res) => {
  logger.info('delete location handler');
  const u = url.parse(req.originalUrl, true);
  const response = await deleteLocationAPI(u.query.name);
  logger.debug(response);
  
  res.redirect('/all');
};

module.exports = { deleteLocation };