const winston = require('winston');

const myformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: myformat
        }),
        new winston.transports.File({ 'filename': 'app.log' })
    ]
});

const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getTimeStamp = () => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = MONTH[date_ob.getMonth()];
    let year = date_ob.getFullYear();
    date = `${date}-${month}-${year}`;
    let hour = date_ob.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    let min = date_ob.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    let sec = date_ob.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    let time = `${hour}:${min}:${sec}`;
    return [date, time];
};

const makeTitleCase = (item) => {
    return item.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};

module.exports = { getTimeStamp, logger, makeTitleCase };