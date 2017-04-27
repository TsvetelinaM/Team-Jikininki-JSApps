import 'jquery';
import { creatingUser } from 'users';
import Sammy from 'sammy';
import {all as homeControllerAll} from 'homeController';
import {login as usersControllerLogin} from 'usersController';

(function() {
    let app = Sammy('#main', function() {
        this.get('#/', homeControllerAll);

        this.get('#/login', usersControllerLogin);
    });

    // Start application
    $(function() {
        app.run('#/');                
    });
}());

// creatingUser();
