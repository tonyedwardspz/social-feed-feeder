'use strict';

class BucketController extends BaseController{
  constructor() {
    super();
  }

  index() {
    console.log('[Bucket] Index');
  }

  show(id) {
    console.log('[Bucket] Show: ' + id);
  }

  new(campaignID) {
    console.log('[Bucket] New');

    let html = app.bucketView.new(campaignID);
    this.updateShell(html);
  }
  // TODO: Test this works
  create() {
    console.log('[Bucket] Create');

    document.getElementById('bucket_save').disabled = true;

    let form = document.querySelector('form');
    let bucket = Bucket.createFromForm(form);

    app.db.publish('/buckets', bucket);

    // window.location = '?campaigns';
  }

  update() {
    console.log('[Bucket] Update');
  }

  delete() {
    console.log('[Bucket] Delete');
  }
}
