import 'jquery';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as usersController from 'usersController';
import 'bootstrap';

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
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var screen = usersController.loadingScreen();
                app.run('#/dashboard');

                console.log(user);
                $('#log-buttons').addClass('hidden');
                $('#btn-signout').removeClass('hidden');
                $('#btn-signout').on('click', function (event) {
                    usersController.signOut();
                });
                screen.finish();
            } else {
                // No user is signed in.
                var screen = usersController.loadingScreen();
                app.run('#/');

                $('#btn-signout').addClass('hidden');
                $('#log-buttons').removeClass('hidden');
                screen.finish();
            }
        });
    });
} ());
