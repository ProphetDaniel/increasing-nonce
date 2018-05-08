export function getNewNonce(){
  return new Promise((resolve, reject) => Meteor.call('updateNonce', function(error, result){
    if (error)
      reject(error);
    resolve(result);
  }));
}
