'use strict';

class Post {
  constructor(postID, bucketID, message,
              lastPostDate, attachment, userID = app.user.id) {
    this.postID = postID;
    this.bucketID = bucketID;
    this.message = message.trim();
    this._lastPostDate = lastPostDate;
    this.attachment = attachment;
    this.userID =userID;
  }

  getDisplayLastPost() {
    let date = convertDateToLocale(this._lastPostDate);
    if (date === '01/01/1970'){
      return 'Never';
    } else {
      return date;
    }
  }

  getAttachmentString() {
    if (this.attachment) {
      return `public/images/uploads/${this.attachment}`;
    } else {
      return 'public/images/placeholder-image.jpg';
    }
  }

  static findByID(id, posts) {
    let thisPost = {};
    posts.forEach(post => {
      if (post.postID === id) {
        thisPost = post;
      }
    });

    return thisPost;
  }

  static setPosts(posts) {
    app.user.posts = posts;
  }

  static getAllPosts() {
    return app.user.posts;
  }

  static createFromForm(form) {

    return new Post (
      randomString(),
      form.bucketID.value,
      form.message.value,
      getDefaultDate(),
      form.attachment.value
    );
  }

  updateFromForm(form) {
    this.message = form.message.value;

    app.user.posts.forEach(post => {
      if (post.postID === this.postID) {
        post = this;
      }
    });

  }

  // Sort post data returned from the server as an array of JSON objects. return
  // an array of Post objects
  static extractPostData(posts) {
    let sortedPosts = [];

    posts.forEach(post => {
      sortedPosts.push(new Post(
        post.postID,
        post.bucketID,
        post.message,
        post.lastPostDate,
        post.attachment,
        post.userID
      ));
    });

    return sortedPosts;
  }

  static removePost(id) {
    console.log('Removeing Post');
    let posts = this.getAllPosts();

    for (let i = posts.length -1; i >= 0; i--) {
      if (posts[i].postID === id){
        console.log('post removed');
        posts.splice(i, 1);
      }
    }

    this.setPosts(posts);
  }
}
