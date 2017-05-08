import 'jquery';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as usersController from 'usersController';
import helpers from 'helpers';
import 'bootstrap';

(function () {
    let app = Sammy('#main', function () {
        this.get('#/', homeController.all);

        this.get('#/home', homeController.all);

        this.get('#/login', usersController.login);

        this.get('#/signup', usersController.signup);

        this.get('#/dashboard', usersController.dashboard)
    });

    // Start application
    $(function () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (localStorage.uid) {
                // User is signed in.
                var screen = helpers.loadingScreen();
                app.run('#/dashboard');

                console.log(user);
                $('#log-buttons').addClass('hidden');
                $('#btn-signout').removeClass('hidden');
                $('#dashboard-button').removeClass('hidden');
                $('#btn-signout').on('click', function (event) {
                    usersController.signOut();
                });
                screen.finish();
            } else {
                // No user is signed in.
                var screen = helpers.loadingScreen();
                app.run('#/');

                $('#btn-signout').addClass('hidden');
                $('#dashboard-button').addClass('hidden');
                $('#log-buttons').removeClass('hidden');
                screen.finish();
            }
        });
    });
} ());
