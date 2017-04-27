let $userName = $('#username').val();
let $userPass = $('#password').val();

function creatingUser() {
  let firebaseRef = firebase.database().ref();

  firebaseRef.child('Text').set('some value');
  console.log('test');
  console.log(JSON.stringify(firebaseRef));
}

export { creatingUser };
