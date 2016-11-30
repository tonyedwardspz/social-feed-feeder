'use strict';

/** A class to control post actions */
class PostController extends BaseController {
  constructor(){
    super();
  }

  /**
  * Displays the new post form
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  new(bucketID, updateHistory = true) {
    console.log(`[Post] New for bucket: ${bucketID}`);

    let bucket = Bucket.findByID(bucketID, app.user.buckets);
    let html = app.postView.new([bucket.campaignID, bucketID]);

    this.updateShell(html);
    this.updateHistory('post_new', updateHistory);
  }

  /**
  * Creates a new post, saving it both locally and remotley after validation.
  * Called from the new post view
  */
  create() {
    console.log('[Post] Create');

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      document.getElementById('post_save').disabled = true;

      let post = Post.createFromForm(form);
      post.attachment = getRandomFileName(form.attachment.files[0].name);

      if (form.attachment.files[0]){
        console.log('has attachment');
        app.db.publishWithImage('/posts/image', post, form.attachment.files[0]);
      } else {
        app.db.publish('/posts', post);
      }

      app.user.posts.push(post);

      app.bucketController.show(post.bucketID);
    });
  }

  /**
  * Displays the edit post view
  * @param {String} id The id of the post to edit
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  edit(id, updateHistory = true) {
    console.log(`[Post] Edit: ${id}`);

    let post = Post.findByID(id, Post.getAllPosts());
    let html = app.postView.edit(post);

    this.updateShell(html);

    this.updateHistory('post_edit', updateHistory, id);
    updateCharCount(post.message);
  }

  /**
  * Updates a post, saving it locally and remotely. Called from the edit view.
  * @param {String} id The id of the post to be deleted
  */
  update(id) {
    console.log(`[Post] Update`);
    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      document.getElementById('post_save_edit').disabled = true;

      let post = Post.findByID(id, Post.getAllPosts());

      post.updateFromForm(form);
      app.db.publish(`/posts/${id}`, post, 'PUT');

      app.bucketController.show(post.bucketID);
    });
  }

  /**
  * Deletes a post both locally and remotely after user confirmation.
  * @param {String} id The id of the post to be deleted
  */
  delete(id, name, bucketID) {
    console.log(`[Post] Delete: ${id}`);

    if (! confirm(`Are you sure you wish to delete this post?`)) {
      return;
    }

    Post.removePost(id);
    app.db.publish(`/posts/${id}`, false, 'DELETE');

    app.bucketController.show(bucketID);
  }
}
