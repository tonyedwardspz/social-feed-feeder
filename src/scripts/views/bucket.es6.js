'use strict';

class BucketView {
  constructor(){

  }

  new(campaignID) {
    return `${getBreadcrumbs('bucket_new', [campaignID])}
            <h2>New Bucket</h2>
            <p>Create a new bucket bu completing the form below<p>
            ${this.form(campaignID)}`;
  }

  show(bucket) {
    let date = convertDateToLocale(bucket.expiry);
    return `${getBreadcrumbs('bucket_show', [bucket.campaignID, bucket.bucketID])}
            <h2 id="name">${bucket.name}</h2>
            <p>${bucket.description}</p>
            <div class="row">
              <div class="column">
                <span>${bucket.maxPerDay}</span>
                <span>Daily Posts</span>
              </div>
              <div class="column">
                <span>${date}</span>
                <span>Expiry</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <button class="bucket_edit" data-id="${bucket.bucketID}">
                  Edit Bucket</button>
                <button class="bucket_delete" data-id="${bucket.bucketID}">
                  Delete Bucket</button>
                <button id="post_new" data-id="${bucket.bucketID}"
                  data-campaignid="${bucket.campaignID}">Add New Post</button>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <h3>Posts</h3>
              </div>
            </div>
            ${app.postView.postList(bucket.posts)}
            `;
  }

  edit(bucket) {
    return `${getBreadcrumbs('bucket_edit', [bucket.campaignID, bucket.bucketID])}
            <h2>Edit Bucket</h2>
            <p>This is the edit bucket view<p>
            ${this.form(bucket.campaignID, bucket)}`;
  }

  form(campaignID, bucket = new Bucket()) {
    let exists = bucket.name !== undefined ? true : false;
    let checked = bucket.repeat === true ? true : false;
    let priority = exists ? bucket.priority : 0;

    return `<form name="form_bucket_new" method="POST" data-id="${campaignID}">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" required
                value="${exists ? bucket.name : ''}"/>

              <label for="description">Description</label>
              <textarea name='description' id='description'
                >${exists ? bucket.description : ''}</textarea>

              <label for="priority">Priority</label>
              <select name='priority' id='priority' required>
                <option value="2" ${priority === 2 ? 'selected' : ''}>
                        High</option>
                <option value="1" ${priority === 1 ? 'selected' : ''}>
                        Medium</option>
                <option value="0" ${priority === 0 ? 'selected' : ''}>
                        Low</option>
              </select>

              <label for='expiry'>Expiry Date</label>
              <input name='expiry' id='expiry' type='date'
                value="${exists ? convertDateForInput(bucket.expiry) : ''}"/>

              <label for="maxPerDay">Max posts per day</label>
              <input type="number" name="maxPerDay" id="maxPerDay" min="0"
                     max="5" default="0"
                     value="${exists ? bucket.maxPerDay : 1}"/>

              <label for="repeat">Repeat?</label>
              <input type="checkbox" name="repeat" id="repeat"
                ${checked ? 'checked' : ''}/>

              <label for="frequency">Max Per Week</label>
              <input type="number" name="frequency" id="frequency" min="0"
                     max="7" value="${exists? bucket.frequency : '1'}" required/>

              <input type="hidden" id="campaignID" value="${campaignID}" />

              <button id='${!exists ? 'bucket_save' : 'bucket_save_edit'}'
                      data-id="${!exists ? campaignID :bucket.bucketID}">Save</button>
              <button id="${!exists ? 'campaign_index' : ''}"
                      class="${!exists ? 'campaign_show' : ''}"
                      data-id="${campaignID}">Cancel</button>
            </form>`;
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
                      <th>Max Daily Posts</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
               `;

    buckets.forEach(bucket => {
      html += `<tr>
                 <td><a href="#" class="bucket_show" data-id="${bucket.bucketID}" >
                   ${bucket.name}</a></td>
                 <td>${bucket.displayRepeat()}</td>
                 <td>${bucket.frequency}</td>
                 <td>${convertDateToLocale(bucket.expiry)}</td>
                 <td>${bucket.displayPriority()}</td>
                 <td>${bucket.maxPerDay}</td>
                 <td>
                   <a href="#" class="bucket_edit" data-id="${bucket.bucketID}">
                     <img src="/images/pencil.svg" alt="edit bucket" class="icon"/>
                   </a>
                   <a href="#" class="bucket_delete"
                      data-id="${bucket.bucketID}" data-name="${bucket.name}"
                      data-campaignid="${bucket.campaignID}">
                      <img src="/images/x.svg" alt="Delete bucket"
                           class="icon"/>
                   </a>
                 </td>
               </tr>

             `;
    });

    return html;
  }
}
