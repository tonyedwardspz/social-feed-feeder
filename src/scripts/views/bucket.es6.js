class BucketView {
  constructor(){

  }

  getIndex(buckets) {
    return `<h1>Bucket Index<h1>
            <p>This is the bucket index<p>`;
  }

  getNew(bucket) {
    return `<h1>New Bucket<h1>
            <p>This is the new bucket view<p>`;
  }

  show(bucket) {
    return `<h1>Show Bucket<h1>
            <p>This is the show bucket view<p>`;
  }

  edit(bucket) {
    return `<h1>Edit Bucket<h1>
            <p>This is the edit bucket view<p>`;
  }
}
