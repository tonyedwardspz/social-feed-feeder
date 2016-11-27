'use strict';

class Post {
  constructor(postID, bucketID, name, message,
              lastPostDate, attachment, expiry, userID = app.user.id) {
    this.postID = postID;
    this.bucketID = bucketID;
    this.name = name;
    this.message = message;
    this.lastPostDate = lastPostDate;
    this.attachment = attachment;
    this.expiry = expiry;
    this.userID =userID;
  }

  getDisplayLastPost() {
    return convertDateToLocale(this.lastPostDate);
  }

  getDisplayExpiry() {
    return convertDateToLocale(this.expiry);
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
      form.name.value,
      form.message.value,
      getDateOneYearAgo(),
      form.attachment.value,
      form.expiry.value
    );
  }

  // Sort post data returned from the server as an array of JSON objects. return
  // an array of Post objects
  static extractPostData(posts) {
    let sortedPosts = [];

    posts.forEach(post => {
      sortedPosts.push(new Post(
        post.postID,
        post.bucketID,
        post.name,
        post.message,
        post.lastPostDate,
        post.attachment,
        post.expiry,
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
