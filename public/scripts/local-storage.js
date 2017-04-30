function localStorageUsers(currentUser) {
  //getting data from the firebase:
  let database = firebase.database().ref('users');
  database.on('value', gotData, errData);

  function gotData(data) {
    let usersInFirebase = data.val();
    let keys = Object.keys(usersInFirebase);

    for (let key in usersInFirebase) {
      //console.log(usersInFirebase[key]);
      for (let innerKey in usersInFirebase[key]) {
        if (innerKey==='_email') {
          if(usersInFirebase[key][innerKey] === currentUser.email) {
            localStorage.setItem('username', usersInFirebase[key][_username]);
          }
        }
      }
      console.log(localStorage.username);
    }
  };

  function errData(err) {
    console.log(err);
  };
};
export {localStorageUsers};
