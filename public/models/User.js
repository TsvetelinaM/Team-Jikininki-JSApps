import List from 'classList';
import Item from 'classItem';

class User {
    constructor(fullname, username, email, password) {
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    get fullname() {
        return this._fullname;
    }

    set fullname(value) {
        this._fullname = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    add() {
        // let newUser = new Promise((resolve) => {
        //     firebase.database().ref('users').push(new User(this.fullname, this.username, this.email, this.password));
        //     firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
        //
        //     setTimeout(function () {
        //         resolve(firebase.auth().currentUser);
        //     }, 2000);
        // });
        //
        // newUser.then((currentUser) => {
        //     currentUser.updateProfile({
        //         displayName: this.username
        //     }).then(function () {
        //         console.log(firebase.auth().currentUser.displayName);
        //     }, function (error) {
        //         console.log('error with currentUser auth');
        //     });
        //   let firstUserList = new List('Test01', 'Test01', 'Test01');
        //   firstUserList.addItem(new Item('title', false))
        //   firebase.database().ref('lists/' + currentUser.uid).push(firstUserList);
        // });


    }
}

export { User as default }
