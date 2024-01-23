'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();

  const copyDate = date.split(separatorFrom);
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i][0]) {
      case 'Y':
        year = copyDate[i];

        if (fromFormat[i].length === 2) {
          year = '19' + copyDate[i];
        }

        if (fromFormat[i].length === 2 && +copyDate[i] < 30) {
          year = '20' + copyDate[i];
        }

        break;

      case 'M': month = copyDate[i];

        break;

      case 'D': day = copyDate[i];
      
        break;

      default:
        throw new Error('unexpected action');
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i][0]) {
      case 'Y':
        if (toFormat[i].length === 2) {
          year = year.slice(2);
        }

        copyDate[i] = year;
        break;

      case 'M':
        copyDate[i] = month;
        break;

      case 'D':
        copyDate[i] = day;
        break;

      default:
        throw new Error('unexpected action');
    }
  }

  return copyDate.join(separatorTo);
}

module.exports = formatDate;
