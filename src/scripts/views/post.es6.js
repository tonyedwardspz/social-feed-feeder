'use strict';

class PostView {
  constructor(){

  }

  index(posts) {
    return `<h2>Post Index</h2>
            <p>This is the index of posts<p>`;
  }

  new(parents) {
    return `${getBreadcrumbs('post_new', parents)}
            <h2>New Bucket</h2>
            <p>Add a new post to the current bucket<p>
            <form name="form_post_new" method="POST" data-bucketid="${parents[0]}">

              <label for="name">Name</label>
              <input type="text" name="name" id="name" required/>

              <label for="message">Message</label>
              <textarea name='message' id='message'></textarea>

              <label for='expiry'>Expiry Date</label>
              <input name='expiry' id='expiry' type='date' />

              <label for="attachment">Attachment</label>
              <input type="file" name="attachment" id="attachment"/>

              <input type="hidden" id="bucketID" value="${parents[0]}" />
              <input type="hidden" id="campaignID" value="${parents[1]}" />

              <button id='post_save'>Save</button>
              <button class='bucket_show' data-id="${parents[0]}">Cancel</button>
            </form>`;
  }

  show(post) {
    return `<h2>Show Post</h2>
            <p>This is the show post view<p>`;
  }

  edit(post) {
    return `<h2>Edit Post</h2>
            <p>This is the edit post view<p>`;
  }

  postList(posts) {
    let html = `<table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Message</th>
                      <th>Last Posted</th>
                      <th>Attachment</th>
                      <th>Expires</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
               `;

    posts.forEach(post => {
      html += `<tr>
                 <td><a href="#" class="post_show" data-id="${post.postID}" >
                   ${post.name}</a></td>
                 <td>${post.message}</td>
                 <td>${post.getDisplayLastPost()}</td>
                 <td>${post.attachment ? 'Yes' : 'No'}</td>
                 <td>${post.getDisplayExpiry()}</td>
                 <td>
                   <a href="#" class="post_edit" data-id="${post.postID}">
                     <img src="/images/pencil.svg" alt="edit post" class="icon"/>
                   </a>
                   <a href="#" class="post_delete"
                      data-id="${post.postID}" data-name="${post.name}"
                      data-bucketid="${post.bucketID}">
                      <img src="/images/x.svg" alt="Delete post"
                           class="icon"/>
                   </a>
                 </td>
               </tr>

             `;
    });

    return html;
  }
}
