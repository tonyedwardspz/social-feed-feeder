'use strict';

class Bucket {
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

  displayPriority() {
    switch (this.priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
    }
  }

  displayRepeat() {
    return this.repeat ? 'Yes' : 'No';
  }

  get posts(){
    let posts = [];

    app.user.posts.forEach(post => {
      if (post.bucketID === this.bucketID) {
        posts.push(post);
      }
    });

    return posts;
  }

  // This crashes the app for some reason? Made priority sudo-private instead
  // set priority(priority) {
  //   this.priority = priority;
  // }

  static getAllBuckets() {
    return app.user.buckets;
  }

  static setBuckets(buckets) {
    app.user.buckets = buckets;
  }

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

  static createFromForm(form) {
    return new Bucket(
      randomString(),
      form.dataset.id,
      form.name.value,
      form.description.value,
      form.expiry.value,
      form.priority.value,
      form.maxPerDay.value,
      form.repeat.value,
      form.frequency.value
    );
  }

  // Search the users bucket for a specific item
  static findByID(id, buckets) {
    let thisBucket = {};
    buckets.forEach(bucket => {
      if (bucket.bucketID === id) {
        thisBucket = bucket;
      }
    });

    return thisBucket;
  }

  static removeBucket(id) {
    console.log('removing bucket');
    var buckets = this.getAllBuckets();

    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].bucketID === id) {
        console.log('bucket deleted');
        buckets.splice(i, 1);
      }
    }

    this.setBuckets(buckets);
  }
}
