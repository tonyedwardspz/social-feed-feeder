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
