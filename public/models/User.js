class User {
    constructor(fullname, username, email, password) {
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.password = password;
        this._lists = [];
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

    get lists() {
        return this._lists.slice();
    }

    addList(list) {
        // TODO
        if(list) {
            this._lists.push(list);
        }
    }

    add() {

        let newUser = new Promise((resolve) => {
            firebase.database().ref('users').push(new User(this.fullname, this.username, this.email, this.password));
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password);

            setTimeout(function () {
                resolve(firebase.auth().currentUser);
            }, 2000);
        });

        newUser.then((currentUser) => {
            currentUser.updateProfile({
                displayName: this.username
            }).then(function () {
                console.log(firebase.auth().currentUser.displayName);
            }, function (error) {
                console.log('error');
            });
        });
    }
}

export { User as default }
