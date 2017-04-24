let $userName = $('#userName').val();
let $userPass = $('#userPass').val();

function creatingUser() {
  let firebaseRef = firebase.database().ref();
  console.log('test');
  console.log(JSON.stringify(firebaseRef));
}


export { creatingUser };
