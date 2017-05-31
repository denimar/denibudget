const mongoose = require('mongoose');
const model = require('./category.model');
const Category = mongoose.model('Category');
const CategoryHelper = require('./category.helper').default;
const categoryHelper = new CategoryHelper();
const CategoryCache = require('./category.cache').default;

module.exports = {

  getCategories: () => {
    return categoryHelper.getCategories();
  },

  getCategoryById: (id) => {
    return categoryHelper.getCategoryById(id);
  },

  getCategoriesList: (onlyLeafItems) => {
    return categoryHelper.getCategoriesList(onlyLeafItems);
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

        _getCategoryById(newDocument._id)
          .then(data => {
            //CategoryCache.clear();
            success(data);
          });

      });

    });

  },

  upd: function(documentToUpd) {
    return new Promise(function(success) {

      let updDocument = new Category(documentToUpd);
      Category.findByIdAndUpdate(documentToUpd._id, documentToUpd, (err, updatedModel) => {
        if (err) return handleError(err);

        _getCategoryById(documentToUpd._id)
          .then(data => {
            //CategoryCache.clear();
            success(data);
          });

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

function _getCategoryById(id) {
  return new Promise(success => {
    Category.findById(id)
      .exec()
        .then(function(data) {
          success(data);
        });
  });

}
