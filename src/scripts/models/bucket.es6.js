'use strict';

/** A class representing a bucket */
class Bucket {
  /**
  * @param {String} bucketID The id of the bucket
  * @param {String} campaignID The id of the parent campaign
  * @param {String} name The title of the bucket
  * @param {String} description The description of the bucket
  * @param {String} expiry The date string to expire the bucket on
  * @param {Integer} priority The priority of the bucket
  * @param {Integer} maxPerDay The maximun posts from the bucket to post
  * @param {Boolean} repeat Should the bucket's posts repeat?
  * @param {Intenger} frequency How many time a week should this buckets content be posted
  * @param {String} [userID=app.user.id] The id of user this bucket belongs to
  */
  constructor(bucketID, campaignID, name, description, expiry, priority,
              maxPerDay, repeat, frequency, userID = app.user.id) {
    this.bucketID = bucketID;
    this.campaignID = campaignID;
    this.name = name;
    this.description = description;
    this.expiry = expiry;
    this.priority = priority;
    this.maxPerDay = maxPerDay;
    this.repeat = repeat;
    this.frequency = frequency;
    this.userID = userID;
  }

  /**
  * Generates the priority to be displayed in the UI. If no prioity is set
  * it does things the Cornish way.
  */
  displayPriority() {
    switch (parseInt(this.priority)) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      default:
        return 'Drekly';
    }
  }

  /**
  * Generates the display value for the repetition of the posting of posts
  * within a bucket
  */
  displayRepeat() {
    return this.repeat ? 'Yes' : 'No';
  }

  /**
  * Itterates over the apps posts, returning those related to the current bucket
  * @return {Array.Post} An array of posts for the current bucket
  */
  get posts(){
    let posts = [];

    app.user.posts.forEach(post => {
      if (post.bucketID === this.bucketID) {
        posts.push(post);
      }
    });

    return posts;
  }

  /**
  * Updates the current bucket from the values entered in the bucket's form
  * @param {Form} form HTML form for values to be extracted from
  */
  updateFromForm(form) {
    this.name = form.name.value.trim();
    this.description = form.description.value.trim();
    this.expiry = form.expiry.value;
    this.priority = form.priority.value;
    this.maxPerDay = form.maxPerDay.value;
    this.repeat = form.repeat.value;
    this.frequency = form.frequency.value;

    app.user.buckets.forEach(buck => {
      if (buck.bucketID === this.bucketID) {
        buck = this;
      }
    });
  }

  /**
  * Get all buckets for the current user
  * @return {Array.Buckets} The users buckets
  */
  static getAllBuckets() {
    return app.user.buckets;
  }

  /**
  * Sets the users buckets to be the provided array of values
  * @param {Array.Buckets} buckets The users buckets
  */
  static setBuckets(buckets) {
    app.user.buckets = buckets;
  }

  /**
  * Creates an arrays of bucket objects from the passed array of JSON objects
  * @param {Array.String} buckets JSON data returned from the server
  * @return {Array.Buckets} An array of bucket objects
  */
  static extractBucketData(buckets) {
    var sortedBuckets = [];

    buckets.forEach(bucket => {
      sortedBuckets.push(new Bucket(
        bucket.bucketID,
        bucket.campaignID,
        bucket.name,
        bucket.description,
        bucket.expiry,
        bucket.priority,
        bucket.maxPerDay,
        bucket.repeat,
        bucket.frequency,
        bucket.userID
      ));
    });

    return sortedBuckets;
  }

  /**
  * Creates a new bucket from the passed form object, generating a new local
  * ID and triming whitespace from string inputs.
  * @param {Form} form The form containing the new buckets data
  */
  static createFromForm(form) {
    return new Bucket(
      randomString(),
      form.campaignID.value,
      form.name.value.trim(),
      form.description.value.trim(),
      form.expiry.value,
      form.priority.value,
      form.maxPerDay.value,
      form.repeat.value,
      form.frequency.value
    );
  }

  /**
  * Finds a bucket from the users buckets by the passed ID
  * @param {String} id ID of the requested bucket
  * @param {Array.Bucket} buckets An array containing all user buckets
  * @return {Bucket} The bucket for the passed ID
  */
  static findByID(id, buckets) {
    let thisBucket = {};
    buckets.forEach(bucket => {
      if (bucket.bucketID === id) {
        thisBucket = bucket;
      }
    });

    return thisBucket;
  }

  /**
  * Removes a bucket from the users array of objects by the passed ID
  * @param {String} id ID of the bucket to delete
  */
  static removeBucket(id) {
    console.log('removing bucket');
    let buckets = this.getAllBuckets();

    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].bucketID === id) {
        console.log('bucket deleted');
        buckets.splice(i, 1);
      }
    }

    this.setBuckets(buckets);
  }
}
