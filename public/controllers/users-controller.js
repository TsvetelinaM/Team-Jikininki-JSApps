import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from 'classUser'
import toastr from 'toastr';
import ErrorDiv from 'classErrorDiv';

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

            //User validation
            if ($('#fullname').val().length>0 && $('#username').val().length>0) {
            //password validation
            if(password === confirmedPassword) {
                let fullname = $('#fullname').val();
                let username = $('#username').val();
                let email = $('#email').val();
                let passHash = CryptoJS.SHA1(password).toString();

                //mail validation
                let emailREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let validEMail = emailREG.test(email);
                if (validEMail) {
                  let user = new User(fullname, username, email, passHash);
                  console.log(JSON.stringify(user));


                  //TODO check if user exists by email

                  //Saving user in the Firebase DB
                  let firebaseRef = firebase.database().ref('users');
                  firebaseRef.push(user);
                  
                } else {
                 let errorMessage = new ErrorDiv('Not a valid email.');
                 toastr.error("Not a valid email.");
                }

            } else {
                // TODO Show a pop up for different password and reload the form
                toastr.error("Passwords must match.");
            }
          } else {
            let errorMessage = new ErrorDiv('Please enter username and fullname');
            toastr.error('Please enter username and fullname');
          }
        });
    });
}

export { login, signup };
