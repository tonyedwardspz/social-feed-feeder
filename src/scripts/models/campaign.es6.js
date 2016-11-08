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

  static createFromForm(form) {
    return new Campaign(
      form.name.value,
      form.description.value,
      form.expiry.value,
      form.dailyPosts.value
    );
  }

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
