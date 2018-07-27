import { db } from './firebase';
import { storage } from './firebase';
// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...

storage.ref().constructor.prototype.putFiles = (files) => { 
  var ref = this;
  const fileBlobs = [...this.state.blobs];
  return Promise.all(fileBlobs.map(function(file) {
    return ref.child(file.name).put(file);
  }));
}
// use it!
// storage.ref().putFiles(files).then(metadatas => {
  // Get an array of file metadata
// }).catch(error =>  {
//   // If any task fails, handle this
// }); 