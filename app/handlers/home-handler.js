const { logger, makeTitleCase } = require('../utils');
const { findWorkersByHome } = require('../api');

const checkForErrors = ((body) => {
  const errors = [];
  const errorList = {};

  if (body.home.length === 0) {
    errors.push(
      {
        text: 'Home is mandatory',
        href: '#home',
      },
    );
    errorList.home = 'Home is Mandatory';
  }

  if (errors.length > 0) {
    errors.push(errorList);
  }

  return errors;
});

const postHome = async (req, res) => {
  logger.info('post home handler');
  const errors = checkForErrors(req.body);
  if (errors.length > 0) {
    const errorList = errors[errors.length - 1];
    res.render('pages/home', {
      errors,
      errorList,
      home: req.body.home,
      data: '',
    });
    return;
  }

  const home = makeTitleCase(req.body.home);
  const response = await findWorkersByHome(home);
  logger.debug(response);

  const list = response.data;
  // eslint-disable-next-line
  list.sort((a, b) => {
    return a.workerId - b.workerId;
  });

  res.render('pages/home', {
    data: list,
    home,
  });
};

module.exports = { postHome };
