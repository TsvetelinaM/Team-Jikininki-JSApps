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
}

export { User as default }
