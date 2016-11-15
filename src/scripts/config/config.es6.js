let dummyData = {
  user: {
    _id: '581ddc4ae25cff526eb7894e',
    name: 'Tony Edwards',
    userID: '559d94e3f97cadcd745293d2',
    accessToken: '1/451ecf1c93e1d171870b73b0576a2539',
    __v: '0',
    accountIDS: ['abcd', 'efgh']
  },
  campaigns:
    [ { _id: '581e042ce9980565e15b27df',
       campaignID: 'Lb6yd3dzhs4rDGl4Hehn5Yq6X9OCaHhH',
       name: 'Campaign One',
       description: 'Campaign one which is all about funky chickens',
       expiry: '2017-11-09T00:00:00.000Z',
       dailyPosts: 3,
       userID: '559d94e3f97cadcd745293d2',
       __v: 0
     }],
  buckets: {},
  posts: {}
};

console.log('Dummy Data: Campaigns - ' + dummyData.campaigns[0]);
