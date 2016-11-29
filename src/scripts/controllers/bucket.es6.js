'use strict';

/** A class to control bucket actions */
class BucketController extends BaseController{
  constructor() {
    super();
  }

  /**
  * Displays an individual bucket
  * @param {String} id The id of the bucket to show
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
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

  /**
  * Displays the new bucket form
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  new(campaignID, updateHistory = true) {
    console.log('[Bucket] New for campaign: ' + campaignID);

    let html = app.bucketView.new(campaignID);
    this.updateShell(html);
    this.updateHistory('bucket_new', updateHistory);
  }

  /**
  * Creates a new bucket, saving it both locally and remotley after validation.
  * Called from the new bucket view
  */
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

  /**
  * Displays the edit bucket view
  * @param {String} id The id of the bucket to edit
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  edit(id, updateHistory = true) {
    console.log('[Bucket] Edit: ' + id);

    let bucket = Bucket.findByID(id, Bucket.getAllBuckets());
    let html = app.bucketView.edit(bucket);

    this.updateShell(html);
    this.updateHistory('bucket_edit', updateHistory, id);
  }

  /**
  * Updates a bucket, saving it locally and remotely.
  * Called from the edit view
  * @param {String} id The id of the bucket to be deleted
  */
  update(id) {
    console.log('[Bucket] Update: ' + id);

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      let bucket = Bucket.findByID(id, Bucket.getAllBuckets());

      bucket.updateFromForm(form);
      app.db.publish(`/buckets/${id}`, bucket, 'PUT');

      this.show(bucket.bucketID);
    });
  }

  /**
  * Deletes a bucket both locally and remotely after user confirmation.
  * @param {String} id The id of the bucket to be deleted
  */
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
