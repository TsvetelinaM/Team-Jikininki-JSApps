function localStorageUsers() {
  //getting data from the firebase:
  let database = firebase.database().ref('users');
  database.on('value', gotData, errData);

  function gotData(data) {
    let usersInFirebase = data.val();
    let keys = Object.keys(usersInFirebase);
    let currentUser = firebase.auth().currentUser;

    //finding data in the users array
    // for (let key in usersInFirebase) {
    //   for (let innerKey in usersInFirebase[key]) {
    //     if (innerKey==='_email') {
    //       if(usersInFirebase[key][innerKey] === currentUser.email) {
    //         console.log(usersInFirebase[key]['_username']);
    //         console.log(localStorage.username);
    //         localStorage.setItem('username', usersInFirebase[key]['_username']);
    //       }
    //     }
    //   }
    // }

    localStorage.setItem('username', currentUser.displayName);
    console.log(localStorage.username);
  };

  function errData(err) {
    console.log(err);
  };
};
export {localStorageUsers};
