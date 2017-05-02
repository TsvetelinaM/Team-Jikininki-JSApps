function setLocalStorage(displayName) {
  // //getting data from the firebase:
  // let database = firebase.database().ref('users');
  // database.on('value', gotData, errData);

  // function gotData(data) {
  //   // let usersInFirebase = data.val();
  //   // let keys = Object.keys(usersInFirebase);
  //   let currentUser = firebase.auth().currentUser;


  // };

  // function errData(err) {
  //   console.log(err);
  // };

  localStorage.setItem('username', displayName);
}

export { setLocalStorage }
