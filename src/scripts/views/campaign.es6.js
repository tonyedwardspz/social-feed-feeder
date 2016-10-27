class CampaignView {
  constructor(){

  }

  getIndex(campaigns) {
    return `<h1>Campaign Index<h1>
            <p>This is the campaign index<p>`;
  }

  getNew(campaign) {
    return `<h1>New Campaign<h1>
            <p>This is the new campaign view<p>`;
  }

  show(campaign) {
    return `<h1>Show Campaign<h1>
            <p>This is the show campaign view<p>`;
  }

  edit(campaign) {
    return `<h1>Edit Campaign<h1>
            <p>This is the edit campaign view<p>`;
  }
}
