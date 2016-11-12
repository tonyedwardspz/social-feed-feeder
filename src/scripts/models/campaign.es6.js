class Campaign {
  constructor(name, description, expiry, dailyPosts, userID = app.user.id,
              campaignID = randomString()) {
    this.campaignID = campaignID;
    this.name = name;
    this.description = description;
    this.expiry = expiry;
    this.dailyPosts = dailyPosts;
    this.userID = userID;
  }

  static getAllCampaigns() {
    return app.user.campaigns;
  }

  // Search the users campaigns for the correct object
  static getByID(id){
    let thisCampaign = {};
    app.user.campaigns.forEach(campaign => {
      if (campaign.campaignID === id) {
        thisCampaign = campaign;
      }
    });

    return thisCampaign;
  }

  // Create and return a new campaign from a passed form
  // Used during the creation of object from user input
  static createFromForm(form) {
    return new Campaign(
      form.name.value,
      form.description.value,
      form.expiry.value,
      form.dailyPosts.value
    );
  }

  // Converts an array of passed JSON objects into an array of
  // Campaign objects before returning.
  static extractCampaignData(campaigns){
    var sortedCampaigns = [];

    campaigns.forEach(campaign => {
      console.log(campaign);
      sortedCampaigns.push(new Campaign(
        campaign.name,
        campaign.description,
        campaign.expiry,
        campaign.dailyPosts,
        campaign.userID,
        campaign.campaignID
      ));
    });

    return sortedCampaigns;
  }
}
