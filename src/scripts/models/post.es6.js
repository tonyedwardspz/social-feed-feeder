class Post {
  constructor(postID, bucketID, name, description,
              lastPostDate, content, expiry, userID = app.user.id) {
    this.postID = postID;
    this.BucketID = bucketID;
    this.name = name;
    this.description = description;
    this.lastPostDate = lastPostDate;
    this.content = content;
    this.expiry = expiry;
    this.userID =userID;
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
        post.description,
        post.lastPostDate,
        post.content,
        post.expiry,
        post.userID
      ));
    });

    return sortedPosts;
  }
}
