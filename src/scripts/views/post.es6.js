'use strict';

class PostView {
  constructor(){

  }

  new(parents) {
    return `${getBreadcrumbs('post_new', parents)}
            <h2>New Bucket</h2>
            <p>Add a new post to the current bucket<p>
            ${this.form(parents[0], parents[1])}
            `;
  }

  edit(post) {
    return `${getBreadcrumbs('post_edit', [post.campaignID, post.bucketID, post.postID])}
            <h2>Edit Post</h2>
            <p>This is the edit post view<p>
            ${this.form(post.bucketID, post.campaignID, post)}`;
  }

  form(bucketID, campaignID, post = new Post()) {
    let exists = post.message !== undefined ? true : false;
    return `<form name="form_post_new" method="POST" data-bucketid="${bucketID}">

              <label for="message">Message</label>
              <textarea name='message' id='message' required
              >${exists ? post.message : ''}</textarea>
              <p class="char-count">Characters Remaing: <span id="tweet-char-remaining">140</span></p>

              <label for="attachment">Attachment</label>
              <input type="file" name="attachment" id="attachment"/>

              <input type="hidden" name="bucketID" id="bucketID"
                     value="${bucketID}" />
              <input type="hidden" name="campaignID" id="campaignID"
                     value="${campaignID}" />

              <button id="${!exists ? 'post_save' : 'post_save_edit'}"
                      data-id="${!exists ? bucketID : post.postID}">
                      Save</button>
              <button class='bucket_show' data-id="${bucketID}">Cancel</button>
            </form>`;
  }

  postList(posts) {
    let html = `<table>
                  <thead>
                    <tr>
                      <th>Message</th>
                      <th>Last Posted</th>
                      <th>Attachment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
               `;

    posts.forEach(post => {
      html += `<tr>
                 <td class="table-message">${post.message}</td>
                 <td>${post.getDisplayLastPost()}</td>
                 <td>${post.attachment ? 'Yes' : 'No'}</td>
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
