'use strict';

/** A class representing a posts views */
class PostView {
  constructor(){

  }

  /**
  * Returns HTML for the 'new post' screen
  * @param {Array.String} ids The ids of the parent objects, starting at the top
  * of the heiarchy
  * @return {String} The HTML string for display
  */
  new(parents) {
    return `${getBreadcrumbs('post_new', parents)}
            <h2>New Post</h2>
            <p>Add a new post to the current bucket<p>
            ${this.form(parents[0], parents[1])}
            `;
  }

  /**
  * Returns HTML for the 'edit post' screen. Fetches the form for the post via
  * the 'form()' method.
  * @param {Post} post A post object to generate html for
  * @return {String} The HTML string for display
  */
  edit(post) {
    return `${getBreadcrumbs('post_edit', [post.campaignID, post.bucketID, post.postID])}
            <h2>Edit Post</h2>
            <p>This is the edit post view<p>
            ${this.form(post.campaignID, post.bucketID, post)}`;
  }

  /**
  * Returns HTML for the post form
  * @param {String} campaignID The ID of the parent campaign
  * @param {String} bucketID The ID of the parent bucket
  * @param {Post} [post] The post to populate the form with
  * @return {String} The HTML string for display
  */
  form(campaignID, bucketID, post = new Post()) {
    let exists = post.message !== undefined ? true : false;

    return `<form name="form_post_new" method="POST" data-bucketid="${bucketID}">

              <label for="message">Message</label>
              <textarea name='message' id='message' required autofocus
              >${exists ? post.message : ''}</textarea>
              <p class="char-count">Characters Remaing:
                <span id="tweet-char-remaining">140</span></p>

              <label for="attachment">Attachment</label>
              <input type="file" name="attachment" id="attachment"
                     accept="image/*"/>

              <div class="image-preview-wrapper">
                <img id="image-preview" class="preview"
                     src="${post.getAttachmentString()}"/>
              </div>

              <input type="hidden" name="bucketID" id="bucketID"
                     value="${bucketID}" />
              <input type="hidden" name="campaignID" id="campaignID"
                     value="${campaignID}" />
              <div class="button-wrapper">
                <button id="${!exists ? 'post_save' : 'post_save_edit'}"
                        data-id="${!exists ? bucketID : post.postID}">
                        Save</button>
                <button class='bucket_show danger' data-id="${bucketID}">
                        Cancel</button>
              </div>
            </form>`;
  }

  /**
  * Returns HTML for a list of posts. Called from the bucket show & publish views
  * @param {Array.Post} posts The collection of posts to generate HTML for
  * @return {String} The HTML string for display
  */
  postList(posts) {
    let html = `<table class="post-list">
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
      let attachmentIMG = `<img src="${post.getAttachmentString()}" />`;
      html += `<tr>
                 <td class="table-message">${post.message}</td>
                 <td>${post.getDisplayLastPost()}</td>
                 <td>${post.attachment ? attachmentIMG : 'No'}</td>
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
               </tr>`;
    });
    html += '</tbody></table>';

    return html;
  }
}
