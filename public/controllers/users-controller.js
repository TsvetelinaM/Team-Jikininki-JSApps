import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from '../models/User.js'
import toastr from 'toastr';

function login(context) {
    templates.get('login').then(function(template) {
        context.$element().html(template());

        $('#btn-login').on('click', function() {
            // TODO check input info and log in if it is correct
        });
    });
}

function signup(context) {
    templates.get('signup').then(function(template) {
        context.$element().html(template());

        $("#btn-signup").on('click', function() {
            let password = $('#password').val();
            let confirmedPassword = $('#confirmPassword').val();

            if(password === confirmedPassword) {
                let fullname = $('#fullname').val();
                let username = $('#username').val();
                let email = $('#email').val();
                let passHash = CryptoJS.SHA1(password).toString();

                let user = new User(fullname, username, email, passHash);
                console.log(JSON.stringify(user));
                // TODO SAVE the new user to firebase database

            } else {
                // TODO Show a pop up for different password and reload the form
                toastr.error("Passwords must match.");
            }
        });
    });
}

export { login }
export { signup }