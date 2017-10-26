const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const repositoryHelper = require('../../helper/repository.helper')(Category);
const CategoryCache = require('./category.cache').default;

class CategoryHelper {

  constructor() {
  }

  getCategories() {
    return new Promise((success) => {
      _getAllCategories()
        .then(categories => {
          success(categories);
        });
    })
  }

  getCategoryById(id) {
    return new Promise(success => {
      repositoryHelper.getAll({
        _id: id
      })
        .then(categories => {
          success(categories[0]);
        });
    });
  }

  getCategoriesList(onlyLeafItems) {
    return new Promise(success => {
      repositoryHelper.getAll({}, {'text': 1})
        .then(categories => {
          const items = (onlyLeafItems ? _getAllLeafItems(categories) : categories);
          const allCategoriesPath = _getAllCategoriesPath(categories, items);
          success(allCategoriesPath);
        });
    });
  }

  setCategoryPath(categoryId) {
    return new Promise(success => {
      // CategoryCache.clear();
      // _getAllCategories()
      //   .then(categories => {
          let category = _getCategoryById(categories.children, categoryId);
          //category.path = _getCategoryPath(categories, category)
          success(category);
        //})
    })

  }

}

function _getCategoryById(categories, categoryId) {
  for (let i = 0 ; i < categories.length ; i++) {
    const category = categories[i];
    if (category.id.toString() === categoryId) {
      return category;
    } else {
      if (category.children && category.children.length > 0) {
        const categoryFound = _getCategoryById(category.children, categoryId);
        if (categoryFound) {
          return categoryFound;
        }
      }
    }
  }
  return null;
}

function _getAllLeafItems(categories) {
  let items = [];
  let length = categories.length;
  categories.forEach(category => {
    const categoryId = category._id.toString();

    let hasChild = false;
    for (let i = 0 ; i < length ; i++) {
      const categorySearch = categories[i];

      if ((categorySearch.parent) && (categorySearch.parent.toString() === categoryId)) {
        hasChild = true;
        break;
      }
    }

    if (!hasChild) {
      items.push(category);
    }

  });

  return items;
}

function _getAllCategoriesPath(categories, leafs) {
  let paths = [];
  leafs.forEach(leaf => {
    paths.push({
      value: leaf._id.toString(),
      label: _getCategoryPath(categories, leaf)
    });
  });
  return paths;
}

function _getCategoryPath(categories, leaf) {
  let pathStr = leaf.text.replace(/\//g, ',');

  if (leaf.parent) {
    let parentId = leaf.parent.toString();
    let i = 0;
    while (i < categories.length) {
      const category = categories[i];
      i++;

      if (category._id.toString() === parentId) {
        if (category.parent) {
          pathStr = category.text + ' » ' + pathStr;
          parentId = category.parent.toString();
          i = 0;
        } else {
          break;
        }
      }

    }
  }
  return pathStr;
}

function _getAllCategories() {
  return new Promise((success) => {
    CategoryCache.getAll({}, {text: 1})
      .then(categories => {
        const rootId = '58cff2abc337ff1d8cc7e49e';
        let categoriesResp = {
          id: rootId,
          expanded: true,
          text: 'Categories',
          children: []
        };
        categories
          .filter(category => {
            return (category.parent && category.parent.toString() === rootId);
          })
          .forEach(filteredCategory => {
            //categoriesResp.children.push(_getCategoryItem(filteredCategory));
            categoriesResp.children.push(_getCategoryItem(categories, filteredCategory));
          });
        success(categoriesResp);
      });
  })
}

function _getCategoryItem(categories, category) {
  let item = {
    id: category._id,
    text: category.text,
    parent: category.parent,
    children: [],
    isLeaf: false,
    path: _getCategoryPath(categories, category)
  };

  for (let i = 0 ; i < categories.length ; i++) {
    let cat = categories[i];
    if (cat.parent && cat.parent.toString() === category._id.toString()) {
      item.children.push(_getCategoryItem(categories, cat));
    }
  }

  return item;
}

export default CategoryHelper;
