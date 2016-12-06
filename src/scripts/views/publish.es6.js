'use strict';

class PublishView {
  constructor() {

  }

  index() {
    return `<h2>Publish new posts</h2>
            <div class="row">
            <div class="column">
            <p>These are the suggested new posts to publish
            </div></div>
            <button id="publish_posts">Publish these posts</button>
            `;
  }
}
