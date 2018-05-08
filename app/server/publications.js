Meteor.publish('nonces', function() {
  return Nonces.find({});
});
