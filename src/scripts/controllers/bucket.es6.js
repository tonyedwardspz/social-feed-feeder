'use strict';

class BucketController extends BaseController{
  constructor() {
    super();
  }

  show(id, updateHistory = true) {
    console.log('[Bucket] Show: ' + id);

    let bucket = Bucket.findByID(id, Bucket.getAllBuckets());
    let html = app.bucketView.show(bucket);

    this.updateShell(html);
    this.updateHistory('bucket_show', updateHistory, id);

    document.querySelectorAll('.table-message').forEach( entry => {
      linkTweets(entry);
    });
  }

  new(campaignID, updateHistory = true) {
    console.log('[Bucket] New');

    let html = app.bucketView.new(campaignID);
    this.updateShell(html);
    this.updateHistory('bucket_new', updateHistory);
  }

  create() {
    console.log('[Bucket] Create');

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      document.getElementById('bucket_save').disabled = true;

      let bucket = Bucket.createFromForm(form);

      app.user.buckets.push(bucket);
      app.db.publish('/buckets', bucket);

      this.show(bucket.bucketID);
    });
  }

  edit(id, updateHistory = true) {
    console.log('[Bucket] Edit');

    let bucket = Bucket.findByID(id, Bucket.getAllBuckets());
    let html = app.bucketView.edit(bucket);

    this.updateShell(html);
    this.updateHistory('bucket_edit', updateHistory, id);
  }

  update(id) {
    console.log('[Bucket] Update');

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      let bucket = Bucket.findByID(id, Bucket.getAllBuckets());

      bucket.updateFromForm(form);
      app.db.publish(`/buckets/${id}`, bucket, 'PUT');

      this.show(bucket.bucketID);
    });
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
