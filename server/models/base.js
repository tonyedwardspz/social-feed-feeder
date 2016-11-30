'use strict';

class BaseModel {
  constructor() {

  }

  getObject(key, value){
    let object = {};
    object[key] = value;
    return object;
  }

  // Return a promise for retrieving the data from the database
  getPromise(mongoModel, userID, model) {
    return new Promise(
      function(resolve, reject) {
        mongoModel.find({ 'userID' : userID }, function(err, data) {
          if (err) {
            reject(err);
          } else {
            // NB - using model var in the return json simply return 'model'
            // instead of the string in the var.
            switch (model) {
              case 'campaigns':
                resolve({ 'campaigns' : data });
                break;
              case 'users':
                resolve({ 'user' : data });
                break;
              case 'posts':
                resolve({ 'posts' : data });
                break;
              case 'buckets':
                resolve({ 'buckets' : data });
                break;
            }
          }
        });
      }
    );
  }
}

module.exports = BaseModel;
