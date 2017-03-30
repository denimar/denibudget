
module.exports = {

  formatNumber: function(number) {
    return Number(parseFloat(number).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
  }

}
