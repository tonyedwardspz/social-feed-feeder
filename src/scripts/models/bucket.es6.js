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
}
