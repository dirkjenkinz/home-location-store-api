const winston = require('winston');

const myformat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: myformat,
    }),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

const MONTH = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getTimeStamp = () => {
  const ts = Date.now();
  const dateObj = new Date(ts);
  let date = dateObj.getDate();
  const month = MONTH[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  date = `${date}-${month}-${year}`;
  let hour = dateObj.getHours();
  hour = (hour < 10 ? '0' : '') + hour;
  let min = dateObj.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  let sec = dateObj.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;
  const time = `${hour}:${min}:${sec}`;
  return [date, time];
};

// eslint-disable-next-line
const makeTitleCase = (item) => {
  return item.replace(
    /\w\S*/g,
    // eslint-disable-next-line
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    },
  );
};

module.exports = { getTimeStamp, logger, makeTitleCase };
