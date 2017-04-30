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
      firebase.database().ref('users').push(new User(this.fullname, this.username, this.email, this.password));
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
    //   let currentUser = firebase.auth().currentUser;
    //   currentUser.updateProfile({
    //       displayName: this.username
    //     //  photoURL: "https://example.com/jane-q-user/profile.jpg"
    //     }).then(function() {
    //       console.log('success');
    //     }, function(error) {
    //       console.log('error');
    //   });
    }
}

export { User as default }
