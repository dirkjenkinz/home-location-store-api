const { logger, makeTitleCase } = require('../utils');
const { postLocationAPI } = require('../api');

const postAdd = async (req, res) => {
    logger.info('post add handler');
    const errors = checkForErrors(req.body);
    if (errors.length > 0) {
        const errorList = errors[errors.length - 1];
        res.render('pages/add', {
            errors: errors,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            errorList: errorList,
        });
        return;
    };
    const name = makeTitleCase(req.body.name);

    const response = await postLocationAPI(
        name,
        req.body.latitude,
        req.body.longitude
    );
    logger.debug(response);
    
    res.render('pages/added-location', {
        response: response,
        details: req.body
    });
};

module.exports = { postAdd };

const checkForErrors = ((body) => {
    const coordinateRegex = /^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/
    let errors = [];
    let errorList = {};

    if (body.name.length == 0) {
        errors.push(
            {
                text: 'Name is mandatory',
                href: '#name'
            }
        );
        errorList.name = 'Name is mandatory';
    };

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