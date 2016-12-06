'use strict';

/**
* A class to control database actions (kinda) inline with the mediator pattern
*/
class Database {
  constructor() {
    // Connect to DB
    console.log(`[DB] Constructor`);
  }

  /**
  * Publish an object to the remote database. Parses the passed object before
  * applying header and sending via fetch
  * @param {String} route The API route which should be published to
  * @param {Object} object The object to publish to the remote DB
  * @param {String} [method='POST'] The HTTP action to use
  */
  publish(route, object, method = 'POST') {
    console.log(`[DB] Publish`);

    // Parse the object we wish to publish
    let data = !object ? JSON.stringify( { a: 'object' } ) : JSON.stringify(object);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    // Send data to the server
    fetch(route, {
      method: method,
      credentials: 'include',
      mode: 'cors',
      headers: headers,
      body: data
    })
    .then(response => {
      console.log(`[DB] Published Succesfully: ${response}`);
    })
    .catch(error => {
      console.log(`[DB] Error Publishing: ${error}`);
    });
  }

  publishWithImage(route, object, method, image) {

    let data = new FormData();
    data.append('image', image, object.attachment);
    data.append('post', JSON.stringify(object));

    fetch(route, {
      method: method,
      credentials: 'include',
      mode: 'cors',
      body: data
    })
    .then(response => {
      console.log(`[DB] Post with image published succesfully: ${response}`);
    })
    .catch(error => {
      console.log(`[DB] Error Publishing post with image: ${error}`);
    });
  }

  /**
  * Retrieve data from the remote database, sending the user object whose data
  * should be fetched.
  * @param {String} route The API route which should be published to
  * @param {User} user The user whose data should be retrieved
  * @callback cb The callbak method which handles data and launches the
  * dashboard
  */
  retrieve(route, user, cb) {
    // Send request to DB
    console.log(`[DB] Retrieve`);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    fetch(route, {
      method:'GET',
      headers: headers,
    }).then(response => {
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
