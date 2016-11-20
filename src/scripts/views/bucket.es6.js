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
              <label for="name">Name</label>
              <input type="text" name="name" id="name" required/>

              <label for="description">Description</label>
              <textarea name='description' id='description'></textarea>

              <label for="priority">Priority</label>
              <select name='priority' id='priority' required>
                <option value="2">High</option>
                <option value="1">Medium</option>
                <option value="0">Low</option>
              </select>

              <label for="maxPerDay">Max posts per day</label>
              <input type="number" name="maxPerDay" id="maxPerDay" min="0" max="5" default="0"/>

              <label for="repeat">Repeat?</label>
              <input type="checkbox" name="repeat" id="repeat" checked />

              <label for="frequency">Frequency (use per week)</label>
              <input type="number" name="frequency" id="frequency" min="0"
                     max="7" required/>

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

  bucketList(buckets) {
    let html = '';

    buckets.forEach(bucket => {
      html += `
        <div class='row'>
          <div class='column'>
            <p><a href="#" class="bucket_show" id="${bucket.bucketID}" >
               ${bucket.name}</a>
            <p>
          </div>
        </div>
        <div class='row'>
          <div class='column'>
            <p>Repeat: ${bucket.repeat}<p>
          </div>
          <div class='column'>
            <p>Frequency: ${bucket.frequency}<p>
          </div>
          <div class='column'>
            <p>Expiry: ${bucket.expiry}<p>
          </div>
          <div class='column'>
            <p>Priority: ${bucket.priority}<p>
          </div>
        </div>
      `;
    });

    return html;
  }
}
