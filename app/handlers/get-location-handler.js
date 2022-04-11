const { makeTitleCase } = require('../utils');

const { getLocationAPI } = require('../api');
const { logger } = require('../utils');
const url = require('url');

const getLocation = async (req, res) => {
    logger.info('get location handler');
    let list = [];
    const u = url.parse(req.originalUrl, true);
    const name = makeTitleCase(u.query.name);
    const response = await getLocationAPI(name);
    if (response !== 400) {
        list = response.data;
    };

    res.render('pages/all', {
        list: response
    });
};

module.exports = { getLocation };