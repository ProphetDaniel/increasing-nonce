import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import { resetDatabase } from 'meteor/xolvio:cleaner';
import {getNewNonce} from '/app/client/getNewNonce';

import {getNonceDoc, Nonces} from '/app/lib/collections/nonces';

StubCollections.stub(Nonces);

Array.prototype.sub = function( b ) {
  var a = this,
    c = [];
  if( Object.prototype.toString.call( b ) === '[object Array]' ) {
    if( a.length !== b.length ) {
      throw new Error("Array lengths do not match.");
    } else {
      for( var i = 0; i < a.length; i++ ) {
        c[ i ] = a[ i ] - b[ i ];
      }
    }
  } else if( typeof b === 'number' ) {
    for( var i = 0; i < a.length; i++ ) {
      c[ i ] = a[ i ] + b;
    }
  }
  return c;
};

// Utility -- returns a promise which resolves when all subscriptions are done
const waitForSubscriptions = () => new Promise(resolve => {
  const poll = Meteor.setInterval(() => {
    if (DDP._allSubscriptionsReady()) {
      Meteor.clearInterval(poll);
      resolve();
    }
  }, 200);
});

describe('ever increasing nonce test', async function () {
  beforeEach(async () => {
    resetDatabase();
    await waitForSubscriptions();
    if (!Nonces.findOne())
      Nonces.insert(getNonceDoc(0));
  });

  it('should be ok', async function () {
    let integersList = Array.from(Array(1000).keys());
    let nonceList = await integersList.map((aNumber) => getNewNonce());
    let resolvedNonceList = await Promise.all(nonceList);
    // let nonShiftedSubList = nonceList.slice(1);
    // let shiftedForwardList = nonceList.slice(0,nonceList.length-1);
    //
    // let delta = nonShiftedSubList.sub(shiftedForwardList);
    // let isEvery = delta.every((aDelta) => aDelta > 0);
    // console.log(isEvery);
    // isEvery.should.be(true);
    // integersList.length.should.be(1000);
  })
});
