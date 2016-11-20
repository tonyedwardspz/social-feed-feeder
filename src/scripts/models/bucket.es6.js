class Bucket {
  constructor(bucketID, campaignID, name, description, priority, maxPerDay,
              repeat, frequency, userID = app.user.id) {
    this.bucketID = bucketID;
    this.campaignID = campaignID;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.maxPerDay = maxPerDay;
    this.repeat = repeat;
    this.frequency = frequency;
    this.userID = userID;
  }

  static getAllBuckets() {
    return app.user.buckets;
  }

  static extractBucketData(buckets) {
    var sortedBuckets = [];

    buckets.forEach(bucket => {
      sortedBuckets.push(new Bucket(
        bucket.bucketID,
        bucket.campaignID,
        bucket.name,
        bucket.description,
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
}
