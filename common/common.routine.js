import Moment from 'moment'

module.exports = {

  formatNumber: function(number) {
    if (number) {
      return Number(parseFloat(number).toFixed(2)).toLocaleString('en', {
          minimumFractionDigits: 2
      });
    } else {
      return '0,00';
    }
  },

  formatDate: function(date, format) {
    let momentDate = Moment(date);
    return momentDate.format(format || 'YYYY-MM-DD');
  },

  /**
   * When the date comes from the server, it has to be parsed to the local timezone
   * It works as well to parse a date when it comes with the ISO format (2017-05-11T00:00:00.000Z)
   */
  parseDateWithTimeZone: function(date) {
    return Moment(date).utcOffset(new Date().getTimezoneOffset());
  }

}
