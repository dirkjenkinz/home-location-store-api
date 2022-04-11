const { logger, makeTitleCase } = require("../utils");
const { findWorkersByHome } = require('../api');

const postHome = async (req, res) => {
  logger.info('post home handler');
  const errors = checkForErrors(req.body);
  if (errors.length > 0) {
    const errorList = errors[errors.length - 1];
    res.render('pages/home', {
      errors: errors,
      errorList: errorList,
      home: req.body.home,
      data: '',
    });
    return;
  };

  const home = makeTitleCase(req.body.home);
  const response = await findWorkersByHome(home);
  logger.debug(response);

  let list = response.data;
  list.sort((a, b) => {
    return a.workerId - b.workerId;
  });

  res.render('pages/home', {
    data: list,
    home:   home,
  });
};

const checkForErrors = ((body) => {
  let errors = [];
  let errorList = {};

  if (body.home.length == 0) {
    errors.push(
      {
        text: 'Home is mandatory',
        href: '#home'
      }
    );
    errorList.home = 'Home is Mandatory';
  };

  if (errors.length > 0) {
    errors.push(errorList);
  };

  return errors;
});

module.exports = { postHome };
