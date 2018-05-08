import {getNonceDoc} from '../lib/collections/nonces'

Meteor.startup(function () {
  if (!Nonces.findOne()) {
    Nonces.insert(getNonceDoc(0));
  }
});
