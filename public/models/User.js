import List from 'classList';
import Item from 'classItem';
import { setLocalStorage } from 'localStorage';
import database from 'database';

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
      //adding user in the firebase DB
        database.pushUser(new User(this.fullname, this.username, this.email, this.password));
        database.createUser(this.email, this.password)
            .then(() => {
               //setting the displayName of the currentUser
                let user = firebase.auth().currentUser;
                let usrname = this.username;
                user.updateProfile({displayName : usrname});
                setLocalStorage('uid', user.uid);
                setLocalStorage('username', this.username);
                //adding the first list for the user
                let firstUserList = new List('Test01', 'Test01', 'Test01');
                firstUserList.addItem(new Item('title', false));
                firebase.database().ref('lists/' + localStorage.uid).push(firstUserList)
                    .then(() => {
                      //reloading the page to dashboard
                        location.hash = '#/dashboard';
                        location.reload();
                    })
                    .catch(err => { console.log(err)});
            })
            .catch(err => { console.log(err) });
    }
}

export { User as default }
