import { Meteor } from 'meteor/meteor';

// Collections
// On server sets up a MongoDB collection 
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
