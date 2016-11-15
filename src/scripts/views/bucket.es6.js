class BucketView {
  constructor(){

  }

  index(buckets) {
    return `<h1>Bucket Index<h1>
            <p>This is the bucket index<p>`;
  }

  new(campaignID) {
    console.log('CAMPAIGN ID from new Bucket: ' + campaignID);
    return `<h1>New Bucket<h1>
            <p>This is the new bucket view<p>
            <form name="form_bucket_new" method="POST" data-id="${campaignID}">
              <label for="name">Bucket Name</label>
              <input type="text" name="name" id="name" />

              <label for="description">Bucket Name</label>
              <textarea name='description' id='description'></textarea>

              <label for="priority">Priority</label>
              <input type="text" name="priority" id="priority" />

              <label for="maxPerDay">Max posts per day</label>
              <input type="number" name="maxPerDay" id="maxPerDay" min="0" max="5" />

              <label for="repeat">Repeat?</label>
              <input type="checkbox" name="repeat" id="repeat" checked />

              <label for="frequency">Frequency (use per week)</label>
              <input type="number" name="frequency" id="frequency" min="0"
                     max="7" />

              <input type="hidden" id="campaignID" value="${campaignID}" />

              <button id='bucket_save'>Save</button>
              <button class='campaign_show' data-id="${campaignID}">Cancel</button>
            </form>`;
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
