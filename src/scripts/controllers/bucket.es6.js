'use strict';

class BucketController extends BaseController{
  constructor() {
    super();
    console.log('From Bucket Controller');
  }

  index() {
    console.log('[Bucket] Index');
  }

  show(id) {
    console.log('[Bucket] Show');
  }

  new(campaignID) {
    console.log('[Bucket] New');

    let html = app.bucketView.new(campaignID);
    this.updateShell(html);
  }

  create() {
    console.log('[Bucket] Create');

  }

  update() {
    console.log('[Bucket] Update');
  }

  delete() {
    console.log('[Bucket] Delete');
  }
}
