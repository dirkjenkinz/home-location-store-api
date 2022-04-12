const { logger } = require('../utils');

const landing = (req, res) => {
  logger.info('landing handler');
  res.render('pages/landing');
};

module.exports = { landing };
