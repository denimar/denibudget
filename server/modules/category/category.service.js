const categoryRepository = require('./category.repository');

module.exports = {

  getCategories: (req, res) => {
    categoryRepository.getCategories()
      .then((categories) => {
        res.end(JSON.stringify(categories, null, 2));
      });
  },

  getCategoryById: (req, res) => {
    if (req.params.id) {
      categoryRepository.getCategoryById(req.params.id)
        .then(function(category) {
          res.end(JSON.stringify(category, null, 2));
        });
    }
  },


  getCategoriesList: (req, res) => {
    const onlyLeafItems = req.params.onlyleaf === 'true';
    categoryRepository.getCategoriesList(onlyLeafItems)
      .then((categories) => {
        res.end(JSON.stringify(categories, null, 2));
      });
  },

  addCategory: (req, res) => {
    categoryRepository.add(req.body)
      .then(function(addedCategory) {
        res.end(JSON.stringify(addedCategory, null, 2));
      });
  },

  updCategory: (req, res) => {
    categoryRepository.upd(req.body)
      .then(function(updatedCategory) {
        res.end(JSON.stringify(updatedCategory, null, 2));
      });
  },

  delCategory: (req, res) => {
    if (req.params.id) {
      categoryRepository.del(req.params.id)
        .then(function(deletedCategory) {
          res.end(JSON.stringify(deletedCategory, null, 2));
        });
    }
  },


}
