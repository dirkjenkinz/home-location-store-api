const url = require('url');
const { getLocationAPI } = require('../api');
const { makeTitleCase, logger } = require('../utils');

const getLocation = async (req, res) => {
  logger.info('get location handler');
  const u = url.parse(req.originalUrl, true);

  const errors = [];
  const errorList = {};

  if (u.query.name.length === 0) {
    errors.push(
      {
        text: 'Name is mandatory',
        href: '#name',
      },
    );
    errorList.name = 'Name is mandatory';
    errors.push(errorList);
    res.render('pages/location', {
      errors,
      name: u.query.name,
      errorList,
    });
    return;
  }

  const name = makeTitleCase(u.query.name);
  const response = await getLocationAPI(name);

  res.render('pages/all', {
    list: response,
  });
};

module.exports = { getLocation };
