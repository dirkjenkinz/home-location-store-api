const url = require('url');

const getChoice = async (req, res) => {
    const u = url.parse(req.originalUrl, true);
    const what = u.query['what-do-you-want-to-do'];
    if (what === 'all') {
        res.redirect('/all');
    } else if (what === 'add') {
        res.render('pages/add');
    } else if (what === 'location') {
        {
            res.render('pages/location', {
                data: '',
            });
        }
    } else if (what === 'find') {
        {
            res.render('pages/find', {
                data: '',
            });
        }
    } else if (what === 'location') {
        {
            res.render('pages/location', {
                data: '',
            });
        }
    } else {
        res.render('pages/landing')
    }
}

module.exports = { getChoice };