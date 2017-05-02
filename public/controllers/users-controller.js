import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from 'classUser'
import toastr from 'toastr';
import ErrorDiv from 'classErrorDiv';
import validations from 'validations';
import { setLocalStorage } from 'localStorage';
import { addList } from 'test';
import * as usersController from 'usersController';

function login(context) {
    templates.get('login').then(function (template) {
        context.$element().html(template());

        $('#btn-login').on('click', function () {
            let currentUser;
            // TODO check input info and log in if it is correct
            let password = $('#password').val();
            let email = $('#email').val();
            //fields validation
            validations.allFieldsRequired(password, email);

            //mail validation
            validations.mailValidation(email);

            //user log in:
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    setLocalStorage(user.displayName);
                    context.redirect('#/dashboard');

                    // location.reload();
                });
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

function loadingScreen() {
    window.loading_screen = window.pleaseWait({
        logo: './css/trans-logo.png',
        backgroundColor: '#5f9ea0',
        loadingHtml: '<div class="spinner"></div>'
    });
    return window.loading_screen;
}

function showDashboard(context) {
    let userInfo = {};
    let lists = [];
    templates.get('user-dashboard').then(function (template) {
        let databaseRef = firebase.database().ref('lists/' + localStorage.username);
        databaseRef.once('value')
            .then(function (data) {
                let resultlists = data.val();
                let keys = Object.keys(resultlists);
                keys.forEach(key => {
                    let list = resultlists[key];
                    lists.push({ key: key, title: list._title, glyphicon: list._glyphicon});
                });
            })
            .then(function () {
                userInfo = { username: localStorage.username, lists: lists };
                context.$element().html(template(userInfo));
            })
            .then(function() {
                $('.list-title').on('click', function(event) {
                    event.preventDefault();
                    $(".active").removeClass("active");
                   $(this).addClass("active");
                    let selectedListKey = $(".active > a > span").attr("data-atribute");
                    firebase.database().ref('lists/' + localStorage.username + '/' + selectedListKey).once('value')
                    .then(function(list) {
                        let items = list.val()._items;
                        templates.get('user-list').then(function(template) {
                        let object = { username: userInfo.username, lists: lists, title: list.val()._title, items: items }
                            context.$element().html(template(object));
                        });
                    });
                });
            });
    });
}

export { login, signup, signOut, showDashboard, loadingScreen };
