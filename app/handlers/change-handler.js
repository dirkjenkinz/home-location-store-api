const url = require('url');
const { logger } = require('../utils');
const { updateLocationAPI } = require('../api');

const getChange = async (req, res) => {
  logger.info('change handler - get');
  const u = url.parse(req.originalUrl, true);
  const what = u.query['what-do-you-want-to-do'];
  res.render('pages/change', {
    name: u.query.name,
    latitude: u.query.latitude,
    longitude: u.query.longitude,
  });
};

const postChange = async (req, res) => {
  logger.info('change handler - post');
  const errors = checkForErrors(req.body);
    if (errors.length > 0) {
        const errorList = errors[errors.length - 1];
        res.render('pages/change', {
            errors: errors,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            errorList: errorList,
        });
        return;
    };
    console.log('>',req.body)
  const response = await updateLocationAPI(
    req.body.name,
    req.body.latitude,
    req.body.longitude,
  );
  logger.debug(response);
  
  res.redirect('/all');
};

const checkForErrors = ((body) => {
  const coordinateRegex = /^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/
  let errors = [];
  let errorList = {};

  if (body.latitude.length == 0) {
      errors.push(
          {
              text: 'Latitude is mandatory',
              href: '#latitude'
          }
      );
      errorList.latitude = 'Latitude is mandatory';
  } else if (!coordinateRegex.test(body.latitude)) { 
      errors.push(
          {
              text: 'Incorrect format for latitude',
              href: '#latitude'
          }
      );
      errorList.latitude = 'Incorrect format for latitude';
  };

  if (body.longitude.length == 0) {
      errors.push(
          {
              text: 'Longitude is mandatory',
              href: '#longitude'
          }
      );
      errorList.longitude = 'Longitude is mandatory';
  } else if (!coordinateRegex.test(body.longitude)) { 
      errors.push(
          {
              text: 'Incorrect format for longitude',
              href: '#longitude'
          }
      );
      errorList.longitude = 'Incorrect format for longitude';
  };
  
  if (errors.length > 0) {
      errors.push(errorList);
  };

  return errors;
});

module.exports = { getChange, postChange };