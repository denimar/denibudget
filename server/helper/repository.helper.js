
module.exports = function(model) {

  return {

    getAll: function(where, sort, skip, limit, beforeExecFind) {
      where = where || {};
      sort = sort || {};
      skip = parseInt(skip || 0);
      limit = parseInt(limit || 0); //0 used to ignore limit property when it wasn't set

      return new Promise(function(success) {
        model.count(where, function( err, count){

          let query = model.find(where)
                        .sort(sort)
                        .skip(skip)
                        .limit(limit)

          //beforeExecFind sometime is used to execute .populate in order to populate foreign fields (bill.category, for example)
          if (beforeExecFind) {
            beforeExecFind(query);
          }

          query.exec()
            .then(function(data) {
              success(data)
            });

        });
      });
    },

    // add: function(newDocumentJson) {
    //   var newDocument = mongoose.model(model, newDocumentJson);
    //   newDocument.save();
    // }

  };

};
