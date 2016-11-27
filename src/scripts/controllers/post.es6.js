'use strict';

class PostController extends BaseController {
  constructor(){
    super();
  }

  show(id) {
    console.log(`[Post] Show: ${id}`);
  }

  new(bucketID, campaignID) {
    console.log(`[Post] New for bucket: ${bucketID}`);

    let html = app.postView.new([bucketID, campaignID]);
    this.updateShell(html);
  }

  create() {
    console.log('[Post] Create');

    document.getElementById('post_save').disabled = true;

    let form = document.querySelector('form');
    let post = Post.createFromForm(form);

    app.user.posts.push(post);
    app.db.publish('/posts', post);

    console.log('posts bucket id: ' + post.bucketID);

    app.bucketController.show(post.bucketID);
  }

  edit(id) {
    console.log(`[Post] Edit: ${id}`);
  }

  update() {
    console.log(`[Post] Update`);
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
