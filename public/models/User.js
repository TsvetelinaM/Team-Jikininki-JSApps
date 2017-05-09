import List from 'classList';
import TaskItem from 'classTaskItem';
import ProductItem from 'classProductItem';
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

    add(context) {
        //adding user in the firebase DB
        database.pushData(new User(this.fullname, this.username, this.email, this.password));
        database.createUser(this.email, this.password)
            .then(() => {
                //setting the displayName of the currentUser
                const user = firebase.auth().currentUser;
                const usrname = this.username;
                user.updateProfile({ displayName: usrname });
                setLocalStorage('uid', user.uid);
                setLocalStorage('username', this.username);

                // Adding the Home list for the user
                const homeList = new List("Home");
                homeList.description = "A list with home tasks";
                homeList.glyphicon = "glyphicon glyphicon-home";
                homeList.addItem(new TaskItem('Example item', false, ""));



                // Adding shopping list
                const shoppingList = new List("Shopping list");
                shoppingList.description = "A list for stuff to buy";
                shoppingList.glyphicon = "glyphicon glyphicon-shopping-cart";
                shoppingList.addItem(new ProductItem('Example grocery item', false, 1));

                database
                    .pushList(shoppingList)
                    .then(() => {
                      database
                          .pushList(homeList);

                    })
                      .then(() => {
                      // Reloading the page to dashboard
                      context.redirect('#/dashboard');
                    });

            })
            .catch(err => { console.log(err) });
    }
}

export { User as default }
