Nonces = new Meteor.Collection("nonces");

function getNonceDoc(_nonce){
  return {timestamp: Date.now(), nonce: _nonce}
}

Meteor.methods({
  updateNonce: function() {
    let selectedDoc = Nonces.findOne({});
    let newDocToUse = getNonceDoc(selectedDoc.nonce + 1);
    Nonces.update(selectedDoc._id, newDocToUse);
    return newDocToUse;
  }
});

module.exports = {
  getNonceDoc,
  Nonces
};
