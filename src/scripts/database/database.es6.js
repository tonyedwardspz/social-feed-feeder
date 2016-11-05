'use strict';

class Database {
  constructor() {
    // Connect to DB
    console.log(`[DB] Constructor`);
  }

  publish(route, object) {
    // Send request to DB
    console.log(`[DB] Publish`);

    // Send data to the server
    fetch(route, {
      method:'POST',
      data: JSON.stringify(object)
    })
    .then()
    .catch();
  }

  retrieve(route, cb) {
    // Send request to DB
    console.log(`[DB] Retrieve`);

    fetch(route).then(response => {
      console.log('[STATUS]', response);
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(data => {
        console.log(`[DB] Response : `, data);
        cb(data);
        return;
      });
    })
    .catch(err => {
      console.log('Fetch Error :-S', err);
    });
  }
}
