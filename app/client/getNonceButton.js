import {getNewNonce} from './getNewNonce'

Template.getNonceButton.events({
  'click button': async function () {
    // increment the counter when button is clicked
    console.log(await getNewNonce());
  }
});
