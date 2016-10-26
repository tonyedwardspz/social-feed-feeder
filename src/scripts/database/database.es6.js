'use strict';

class Database {
  constructor() {
    // Connect to DB
    console.log(`[DB] Constructor`);
  }

  publish(route) {
    // Send request to DB
    console.log(`[DB] Publish`);

    // Send data to the server
  }

  retrieve(route, cb) {
    // Send request to DB
    console.log(`[DB] Retrieve`);

    fetch(route).then(function(response) {
      console.log('[STATUS]', response);
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function(data) {
        console.log(`[DB] Response : `, data);
        cb(data);
        return;
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
}
