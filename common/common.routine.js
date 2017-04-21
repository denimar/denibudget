
module.exports = {

  formatNumber: function(number) {
    if (number) {
      return Number(parseFloat(number).toFixed(2)).toLocaleString('en', {
          minimumFractionDigits: 2
      });
    } else {
      '0,00';
    }
  }

}
