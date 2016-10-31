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
}
