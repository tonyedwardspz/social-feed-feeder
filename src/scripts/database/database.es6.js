'use strict';

class Database {
  constructor() {
    // Connect to DB
    console.log(`[DB] Constructor`);
  }

  publish(route, object) {
    // Send request to DB
    console.log(`[DB] Publish`);
    let str = JSON.stringify(object);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    // Send data to the server
    fetch(route, {
      method:'POST',
      mode: 'cors',
      headers: headers,
      body: str
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  retrieve(route, user, cb) {
    // Send request to DB
    console.log(`[DB] Retrieve`);

    let str = JSON.stringify(user);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    fetch(route, {
      method:'POST',
      headers: headers,
      body: str
    }).then(response => {
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
