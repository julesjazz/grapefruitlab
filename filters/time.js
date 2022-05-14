const { DateTime } = require("luxon");

const now = DateTime.now();

const getDateObj = (date) => {
  if (!date) {
    return now;
  }

  return (typeof date === 'string')
    ? DateTime.fromISO(date)
    : DateTime.fromJSDate(date);
};

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
const htmlDate = (dateObj) => {
  return getDateObj(dateObj).toFormat('yyyy-LL-dd');
};


const date = (dateObj, format) => {
  const formats = {
    list: { month: 'long', year: 'numeric',  },
    show: DateTime.DATE_HUGE,
  }
  const useFormat = formats[format] || DateTime[format] || DateTime.DATE_MED;
  return getDateObj(dateObj).setZone('America/Denver').toLocaleString(useFormat);
};

module.exports = {
  htmlDate,
  date,
  now,
};
