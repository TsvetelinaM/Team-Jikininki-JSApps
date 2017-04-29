import 'jquery';
// import { creatingUser } from 'users';
import Sammy from 'sammy';
import * as homeController from 'homeController';
import * as usersController from 'usersController';

(function() {
    let app = Sammy('#main', function() {
        this.get('#/', homeController.all);
        
        this.get('#/home', homeController.all);

        this.get('#/login', usersController.login);

        this.get('#/signup', usersController.signup);
    });

    // Start application
    $(function() {
        app.run('#/');          
    });
}());

// creatingUser();
