const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const repositoryHelper = require('../../helper/repository.helper')(Category);

export default class CategoryHelper {

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

  getCategoriesList(onlyLeafItems) {
    return new Promise(success => {
      repositoryHelper.getAll()
        .then(categories => {
          const items = (onlyLeafItems ? _getAllLeafItems(categories) : categories);
          const allCategoriesPath = _getAllCategoriesPath(categories, items);
          success(allCategoriesPath);
        });
    });

  }

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
    repositoryHelper.getAll()
      .then(categories => {
        const rootId = '58cff2abc337ff1d8cc7e49e';
        let categoriesResp = {
          id: rootId,
          expanded: true,
          text: 'Categories',
          children: []
        };
        categories.filter(category => {
          return (category.parent && category.parent.toString() === rootId);
        }).forEach(filteredCategory => {
          //categoriesResp.children.push(_getCategoryItem(filteredCategory));
          categoriesResp.children.push(_getCategoryItem(categories, filteredCategory));
        });
        success(categoriesResp);
      });
  })
}
//
// function _getCategoriesPath(category) {
//   let categoriesPath = [category];
//   const categoryChildren = category.children || [];
//   categoryChildren.forEach(child => {
//     categoriesPath = categoriesPath.concat(_getCategoriesPath(child))
//     // if (childChildren.length === 0) {
//     //   categoriesPath.push(_getCategoryPath(child));
//     // } else {
//     //   categoriesPath.push(_getCategoriesPath(child));
//     // }
//
//     //categoryPath += ' » ' + _getCategoryPath(child);
//   });
//
//   return categoriesPath;
// }
//
// function _getCategoryPath(category) {
//   let categoryPath = category.text;
//   // while (category.parent) {
//   //   categoryPath += ' » ' + child.text;
//   //   category = category.parent;
//   // }
//
//   return categoryPath;
//
//   // let categoryPath = category.text;
//   // let children = category.children || [];
//   //
//   // children.forEach(child => {
//   //   categoryPath += ' » ' + _getCategoryPath(child);
//   // });
//   //
//   // return categoryPath;
// }

function _getCategoryItem(categories, category) {
  let item = {
    id: category._id,
    text: category.text,
    parent: category.parent,
    children: [],
    isLeaf: false
  };

  for (let i = 0 ; i < categories.length ; i++) {
    let cat = categories[i];
    if (cat.parent && cat.parent.toString() === category._id.toString()) {
      item.children.push(_getCategoryItem(categories, cat));
    }
  }

  return item;
}
