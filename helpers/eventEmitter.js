const EventEmitter = require('events');
const myEventEmitter = new EventEmitter();
const userRepo = require('../models/user/user.repo');

myEventEmitter.on('processDeclinedRequests', async (data) => {

  /*
[
  {
    partnerId: new ObjectId("6578fb625825ed91fb68e4cf"),
    nationalId: '1',
    partnerUserName: 'ahmed',
    requestStatus: 'pending',
    email: 'a@gmail.com',
    _id: new ObjectId("6665c214dd5aafcdf25acc6f")
  },
  {
    partnerId: new ObjectId("6578fb625825ed91fb68e4cf"),
    nationalId: '1',
    partnerUserName: 'ahmed',
    requestStatus: 'pending',
    email: 'a@gmail.com',
    _id: new ObjectId("6665c214dd5aafcdf25acc6f")
  }
]

*/
  try {
    // no logic was specified 
  }
  catch (err) {
    console.log({
      from: "eventEmitter: processDeclinedRequests",
      message: err.message
    });
  }
});

module.exports = myEventEmitter;