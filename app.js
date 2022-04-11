const express = require('express');
let app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const landingRouter = require('./app/routes/landing');
const choiceRouter = require('./app/routes/choice');
const getAllRouter = require('./app/routes/get-all');
const addRouter = require('./app/routes/add');
const changeRouter = require('./app/routes/change');
const locationRouter = require('./app/routes/location');
const deleteRouter = require('./app/routes/delete-location');
const config = require('./app/config/config');
const { getTimeStamp } = require('./app/utils');
const router = express.Router;
const helmet = require('helmet');
const csp = require('helmet-csp');
const { v4: uuid_v4 } = require('uuid');
const { logger } = require('./app/utils')

/* Generate nonce. */
const nonce = Buffer.from(uuid_v4().toString('base64'));
app.use((req, res, next) => {
  res.locals.nonce = nonce;
  next();
});

app.use(helmet());

app.use(csp({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"],
        scriptSrc: [
            "'self'",
            `'nonce-${nonce}'`, // Pass the nonce value along.
            "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
          ],
        imgSrc: ["'self'"],
        fontSrc: ["'self'"]
    }
}));

// referrerPolicy
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));

nunjucks.configure(['views',
    path.join(__dirname, 'node_modules/govuk-frontend/'),
    path.join(__dirname, 'node_modules/govuk-frontend/govuk/components/'),
    path.join(__dirname, 'app/views/')
], {
    autoescape: true,
    express: app
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));

// routing via express.js
app.use('/css', express.static(path.resolve(__dirname, 'app/public/css')));
app.use('/choice', choiceRouter);
app.use('/', landingRouter);
app.use('/all', getAllRouter);
app.use('/add', addRouter);
app.use('/change', changeRouter);
app.use('/delete', deleteRouter);
app.use('/location', locationRouter);

const PORT = config.port || 3002;
app.listen(PORT, () => {
    const t = getTimeStamp();
    logger.info(`Home Location Store API up and running on port ${PORT} at ${t[0]} - ${t[1]}`);
});

module.exports = { app, router };
