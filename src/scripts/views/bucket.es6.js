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

              <label for='expiry'>Expiry Date</label>
              <input name='expiry' id='expiry' type='date' />

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
    let html = `<table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Repeat</th>
                      <th>Frequency</th>
                      <th>Expiry</th>
                      <th>Priority</th>
                      <th>Max Per Day</th>
                    </tr>
                  </thead>
                  <tbody>
               `;

    buckets.forEach(bucket => {
      console.log(bucket);
      html += `<tr>
                 <td><a href="#" class="bucket_show" data-id="${bucket.bucketID}" >
                   ${bucket.name}</a></td>
                 <td>${bucket.repeat}</td>
                 <td>${bucket.frequency}</td>
                 <td>${convertDateToLocale(bucket.expiry)}</td>
                 <td>${bucket.priority}</td>
                 <td>${bucket.maxPerDay}</td>
               </tr>
               <tr>
                 <td colspan="6">
                   <button class="bucket_edit"
                           data-id="${bucket.bucketID}">Edit Bucket</button>
                   <button class="bucket_delete"
                           data-id="${bucket.bucketID}"
                           data-name="${bucket.name}"
                           data-campaignid="${bucket.campaignID}">
                           Delete Bucket</button>
                 </td>
               </tr>

             `;
    });

    return html;
  }
}
