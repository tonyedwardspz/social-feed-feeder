'use strict';

class PostController extends BaseController {
  constructor(){
    super();
  }

  new(bucketID, updateHistory = true) {
    console.log(`[Post] New for bucket: ${bucketID}`);

    let bucket = Bucket.getByID(bucketID, app.user.buckets);
    let html = app.postView.new([bucket.campaignID, bucketID]);

    this.updateShell(html);
    this.updateHistory('post_new', updateHistory);
  }

  create() {
    console.log('[Post] Create');

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      document.getElementById('post_save').disabled = true;
      let post = Post.createFromForm(form);

      app.user.posts.push(post);
      app.db.publish('/posts', post);

      app.bucketController.show(post.bucketID);
    });
  }

  edit(id, updateHistory = true) {
    console.log(`[Post] Edit: ${id}`);

    let post = Post.findByID(id, Post.getAllPosts());
    let html = app.postView.edit(post);

    this.updateShell(html);
    if (updateHistory) {
      this.updateHistory('post_edit', id);
    }
    updateCharCount(post.message);
  }

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
