import 'jquery';
// import { creatingUser } from 'users';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as usersController from 'usersController';

(function () {
    let app = Sammy('#main', function () {
        this.get('#/', homeController.all);

        this.get('#/home', homeController.all);

        this.get('#/login', usersController.login);

        this.get('#/signup', usersController.signup);

        this.get('#/dashboard', usersController.showDashboard)
    });

    // Start application
    $(function () {
        app.run('#/');

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log(user);
                $('#log-buttons').addClass('hidden');
                $('#btn-signout').removeClass('hidden');
            } else {
                // No user is signed in.
                $('#btn-signout').addClass('hidden');
                $('#log-buttons').removeClass('hidden');
            }
        });
    });
} ());

// creatingUser();
