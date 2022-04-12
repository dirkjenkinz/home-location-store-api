const { getLocationsAPI } = require('../api');
const { logger } = require('../utils');

const getAllLocations = async (req, res) => {
  logger.info('get all handler');
  let list = '';
  const response = await getLocationsAPI();

  if (response.status === 200) {
    list = response.data;
    // eslint-disable-next-line arrow-body-style
    list.sort((a, b) => {
      return a.locationName - b.locationName;
    });
  }

  res.render('pages/all', {
    list,
  });
};

module.exports = { getAllLocations };
