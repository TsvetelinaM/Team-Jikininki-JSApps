import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from 'classUser'
import toastr from 'toastr';
import ErrorDiv from 'classErrorDiv';
import validations from 'validations';
import { localStorageUsers } from 'localStorage';
import { addList } from 'test';

function login(context) {
    templates.get('login').then(function (template) {
        context.$element().html(template());

        $('#btn-login').on('click', function () {
            let currentUser = {};
            // TODO check input info and log in if it is correct
            let password = $('#password').val();
            let email = $('#email').val();
            //fields validation
            validations.allFieldsRequired(password, email);


            //mail validation
            validations.mailValidation(email);

            //current user signOut
            // firebase.auth().signOut();

            //user log in:
            firebase.auth().signInWithEmailAndPassword(email, password);
            currentUser = firebase.auth().currentUser;
            //redirect to user home page:
            // console.log(currentUser); // TODO here user is null

            //TODO LOCALStorage
            localStorageUsers();

            context.redirect('#/dashboard');

            return;
        });
    });
}

function signup(context) {
    templates.get('signup').then(function (template) {
        context.$element().html(template());

        $("#btn-signup").on('click', function () {
            let password = $('#password').val();
            let confirmedPassword = $('#confirmPassword').val();
            let fullname = $('#fullname').val();
            let username = $('#username').val();
            let email = $('#email').val();
            //let passHash = CryptoJS.SHA1(password).toString();
            let passHash = password;

            //fields validation
            validations.allFieldsRequired(fullname, username, email, passHash);

            //password validation
            validations.passwordCheck(password, confirmedPassword);

            //mail validation
            validations.mailValidation(email);

            //creating the user object
            let user = new User(fullname, username, email, passHash);
            console.log(JSON.stringify(user));

            //add user to the DB
            user.add();

            //TODO check if user exists by email

            //Saving user in the Firebase DB
            //firebase.database().ref('users/' + username).set(user);
            // firebase.database().ref('users').push(user);
            // firebase.auth().createUserWithEmailAndPassword(email, passHash);
        });
    });
}

function signOut() {
    localStorage.clear();
    firebase.auth().signOut()
        .then(function () {
            location.hash = '#/';
            location.reload();

            toastr.success("User succesfully signed out.");
        }).catch(function (error) {
            // TODO handle the error
        })
}

function showDashboard(context) {
    templates.get('user-dashboard').then(function (template) {
        var userInfo = { username: localStorage.username };
        context.$element().html(template(userInfo));
        $(document).ready(function(){
          $('[data-toggle="offcanvas"]').click(function(){
          $("#navigation").toggleClass("hidden-xs");
         });
      });

      addList();

    });
}

export { login, signup, signOut, showDashboard };
