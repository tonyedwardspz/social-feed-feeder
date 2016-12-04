'use strict';

class PublishController extends BaseController {
  constructor() {
    super('PublishController');
  }

  index() {
    console.log('[Publish] Index Hit');

    let posts = {};
    let html = app.postView.index(posts);

    this.updateDom(html);
  }

  create() {
    console.log('[Publish] Create Hit');
  }
}
