import List from 'classList';

function addList() {
 const newList = new List('Test01', 'Test01', 'Test01');
 const currentUser = firebase.auth().currentUser;

 //return firebase.database().ref('lists/' + localStorage.username).set(newList);
 return firebase.database().ref('lists/' + localStorage.username).push(newList);
}


export { addList };
