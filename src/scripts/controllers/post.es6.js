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
  }

  create() {
    console.log('[Post Controller] Create');

    document.getElementById('post_save').disabled = true;

    let form = document.querySelector('form');
    let post = Post.createFromForm(form);

    app.user.posts.push(post);
    app.db.publish('/posts', post);

    console.log('posts bucket id: ' + post.bucketID);

    app.bucketController.show(post.bucketID);
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
