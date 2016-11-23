'use strict';

class Post {
  constructor(postID, bucketID, name, message,
              lastPostDate, attachment, expiry, userID = app.user.id) {
    this.postID = postID;
    this.BucketID = bucketID;
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
}
