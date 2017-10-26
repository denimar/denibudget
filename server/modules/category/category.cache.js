const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const repositoryHelper = require('../../helper/repository.helper')(Category);

class CategoryCache {

  static categories = null;

  static clear() {
    //this.categories = null;
  }

  static getAll() {
    return new Promise((success) => {
      //if (this.categories === null) {
        repositoryHelper.getAll()
          .then(categories => {
            this.categories = categories.sort((category1, category2) => {
              if (category1.text < category2.text) return -1;
              if (category1.text > category2.text) return 1;
              return 0;
            });
            success(this.categories)
          });
      //} else {
      //  success(this.categories)
      //}
    })
  }

}

export default CategoryCache;
