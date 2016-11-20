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

    let bucket = Bucket.findByID(id, Bucket.getAllBuckets());
    let html = app.bucketView.show(bucket);

    this.updateShell(html);
  }

  new(campaignID) {
    console.log('[Bucket] New');

    let html = app.bucketView.new(campaignID);
    this.updateShell(html);
  }
  
  create() {
    console.log('[Bucket] Create');

    document.getElementById('bucket_save').disabled = true;

    let form = document.querySelector('form');
    let bucket = Bucket.createFromForm(form);

    app.user.buckets.push(bucket);
    app.db.publish('/buckets', bucket);

    this.show(bucket.bucketID);
  }

  update() {
    console.log('[Bucket] Update');
  }

  delete() {
    console.log('[Bucket] Delete');
  }
}
