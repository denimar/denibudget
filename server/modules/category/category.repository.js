const mongoose = require('mongoose');
const model = require('./category.model');
const Category = mongoose.model('Category');
const CategoryHelper = require('./category.helper').default;
const categoryHelper = new CategoryHelper();

module.exports = {

  getCategories: () => {
    return categoryHelper.getCategories();
  },

  getCategoriesList: () => {
    return categoryHelper.getCategoriesList();
  },

  add: function(body) {
    return new Promise(function(success) {
      let newDocument = new Category({
        parent: mongoose.Types.ObjectId(body.parent),
        text: body.text,
        isLeaf: false,
        children: []
      });

      newDocument.save(function(err) {
        if (err) return handleError(err);
        success(newDocument);
      });

    });

  },

  del: function(id) {
    return new Promise(function(success) {
      Category.remove({_id: mongoose.Types.ObjectId(id)}, (err, removed) => {
        if (err) {
          return handleError(err);
        }
        success(removed);
      });

    });

  },

}
