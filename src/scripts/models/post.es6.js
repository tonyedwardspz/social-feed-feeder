'use strict';

/** A class representing an individual post */
class Post {
  /**
  * @param {String} postID The id of the post
  * @param {String} bucketID The id of the parent bucket
  * @param {String} message The content of the post to share via buffer
  * @param {String} lastPostDate The last date of posting of this post
  * @param {String} attachment The URL string of the posts image attachment
  * @param {String} [userID=app.user.id] The id of user this bucket belongs to
  */
  constructor(postID, bucketID, message,
              lastPostDate, attachment, userID = app.user.id) {
    this.postID = postID;
    this.bucketID = bucketID;
    this.message = message;
    this.lastPostDate = lastPostDate;
    this.attachment = attachment;
    this.userID =userID;
  }

  /**
  * Generate a user friendly date or textual equivilent from the objects date
  * @return {String} The datesting of textual message for the date
  */
  getDisplayLastPost() {
    let date = convertDateToLocale(this.lastPostDate);
    if (date === '01/01/1970'){
      return 'Never';
    } else {
      return date;
    }
  }

  /**
  * Fetches a posts attachemtn URL or a placeholder image
  * @return {String} The attachment string for an IMG tag's SRC parameter
  */
  getAttachmentString() {
    if (this.attachment) {
      if (this.attachment.length > 40){
        return this.attachment;
      } else {
        return 'public/images/uploading-image.jpg';
      }
    } else {
      return 'public/images/placeholder-image.jpg';
    }
  }

  /**
  * Searches the users post by ID for a specific entry
  * @param {String} id The id of the post to find
  * @param {Array.Post} An array containing all of the users posts
  * @return {Post} The found post
  * @static
  */
  static findByID(id, posts) {
    let thisPost = {};
    posts.forEach(post => {
      if (post.postID === id) {
        thisPost = post;
      }
    });

    return thisPost;
  }

  /**
  * Sets the users posts to the passed array of objects
  * @param {Array.Post} An array containing the updated users posts
  * @static
  */
  static setPosts(posts) {
    app.user.posts = posts;
  }

  /**
  * Get all posts for the current user
  * @return {Array.Post} The users posts
  */
  static getAllPosts() {
    return app.user.posts;
  }

  /**
  * Creates a new post from the passed form object, generating a new local
  * ID and setting the detault date and triming whitespace from string inputs.
  * @param {Form} form The form containing the new post's data
  */
  static createFromForm(form) {

    return new Post (
      randomString(),
      form.bucketID.value,
      form.message.value.trim(),
      getDefaultDate(),
      form.attachment.value
    );
  }

  /**
  * Updates a posts attachment value after an image has been uploaded to the
  * cloudinary CDN
  * @param {String} id The id of the post to update
  * @param {String} url The CDN url where the uploaded post image resides
  */
  static updatePostAttachment(id, url){
    app.user.posts.forEach(post => {
      if (post.postID === id) {
        post.attachment = url;
      }
    });
  }

  /**
  * Updates the current post from the values entered in the post's form
  * @param {Form} form HTML form for values to be extracted from
  */
  updateFromForm(form) {
    this.message = form.message.value;

    app.user.posts.forEach(post => {
      if (post.postID === this.postID) {
        post = this;
      }
    });

  }

  /**
  * Creates an arrays of post objects from the passed array of JSON objects
  * @param {Array.String} posts JSON data returned from the server
  * @return {Array.Buckets} An array of post objects
  */
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

  /**
  * Removes a post from the users array of objects by the passed ID
  * @param {String} id ID of the post to delete
  */
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
