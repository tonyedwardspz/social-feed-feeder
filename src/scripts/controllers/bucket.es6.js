'use strict';

class BucketController extends BaseController{
  constructor() {
    super();
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
    console.log(bucket);

    app.user.buckets.push(bucket);
    app.db.publish('/buckets', bucket);

    this.show(bucket.bucketID);
  }

  edit(id) {
    console.log('[Bucket] Edit');

    let bucket = Bucket.findByID(id, Bucket.getAllBuckets());
    let html = app.bucketView.edit(bucket);

    this.updateShell(html);
  }

  update(id) {
    console.log('[Bucket] Update');

    let bucket = Bucket.findByID(id, Bucket.getAllBuckets());
    let form = document.querySelector('form');

    bucket.updateFromForm(form);
    app.db.publish(`/buckets/${id}`, bucket, 'PUT');

    this.show(bucket.bucketID);
  }

  delete(id, name, campaignID) {
    console.log('[Bucket] Delete: ', id);

    if (! confirm(`Delete the "${name}" bucket and all related data?`)) {
      return;
    }

    Bucket.removeBucket(id);
    app.db.publish(`/buckets/${id}`, false, 'DELETE');

    app.campaignController.show(campaignID);
  }
}
