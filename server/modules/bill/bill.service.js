const billRepository = require('./bill.repository');

module.exports = {

  getBills: (req, res) => {
    billRepository.getBills().then((bills) => {
      res.end(JSON.stringify(bills, null, 2));
    });
  },

  addBill: (req, res) => {
    billRepository.add(req.body).then((addedBill) => {
      res.end(JSON.stringify(addedBill, null, 2));
    });
  },

  delBill: (req, res) => {
    let id = req.params.id;

    billRepository.del(id).then((deletedBill) => {
      res.end(JSON.stringify(deletedBill, null, 2));
    });
  }

}
