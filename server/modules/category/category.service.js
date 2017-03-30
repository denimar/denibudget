const categoryRepository = require('./category.repository');

module.exports = {

  getCategories: (req, res) => {
    categoryRepository.getCategories()
      .then((categories) => {
        res.end(JSON.stringify(categories, null, 2));
      });
  },

  getCategoriesList: (req, res) => {
    categoryRepository.getCategoriesList()
      .then((categories) => {
        res.end(JSON.stringify(categories, null, 2));
      });
  },

  addCategory: (req, res) => {
    categoryRepository.add(req.body).then(function(addedCategory) {
      res.end(JSON.stringify(addedCategory, null, 2));
    });
  },

  delCategory: (req, res) => {
    if (req.params.id) {
      categoryRepository.del(req.params.id).then(function(deletedCategory) {
        res.end(JSON.stringify(deletedCategory, null, 2));
      });
    }
  },


}
