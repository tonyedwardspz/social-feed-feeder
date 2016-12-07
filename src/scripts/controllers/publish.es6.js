'use strict';

class PublishController extends BaseController {
  constructor() {
    super('PublishController');
  }

  /**
  * Displays the publish post view when the publish_index url is hit.
  * Gets an array of post suggestions and displays them to the user.
  */
  index() {
    console.log('[Publish] Index Hit');

    let posts = {};
    let html = app.publishView.index(posts);

    this.updateShell(html);
  }

  /**
  * Sends a request to the server to send the selected posts to buffer.
  */
  create() {
    console.log('[Publish] Create Hit');

    // get the remaining post ids from the document and create an object
    let posts = {
      user : User.prepareForUpload(app.user),
      posts : ['1234', '5678', '90qw', '5rv2']
    };


    // send them to the server for posting
    app.db.publish(`/publish/${app.user.id}`, posts);

    // update posts last post date

    // update the dom
  }
}
