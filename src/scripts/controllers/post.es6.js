'use strict';

class PostController extends BaseController {
  constructor(){
    super();
  }

  show(id) {
    console.log(`[Post Controller] Show: ${id}`);
  }

  new(bucketID, campaignID) {
    console.log(`[Post Controller] New for bucket: ${bucketID}`);

    let html = app.postView.new([bucketID, campaignID]);
    this.updateShell(html);

    // add event listener to file input as its been dynamically added to document
    // var placeholder = document.getElementById('attachment_input');
    //
    // var fileInput = document.createElement('input');
    // fileInput.setAttribute('type', 'file');
    //
    // placeholder.appendChild(fileInput);

  }

  create() {
    console.log('[Post Controller] Create');
  }

  edit(id) {
    console.log(`[Post Controller] Edit: ${id}`);
  }

  update() {
    console.log(`[Post Controller] Update`);
  }

  delete(id, name, bucketID) {
    console.log(`[Post Controller] Delete: ${id}`);
  }
}
