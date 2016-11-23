'use strict';

class PostView {
  constructor(){

  }

  getIndex(posts) {
    return `<h1>Post Index<h1>
            <p>This is the index of posts<p>`;
  }

  getNew(post) {
    return `<h1>New Post<h1>
            <p>This is the new post view<p>`;
  }

  show(post) {
    return `<h1>Show Post<h1>
            <p>This is the show post view<p>`;
  }

  edit(post) {
    return `<h1>Edit Post<h1>
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
