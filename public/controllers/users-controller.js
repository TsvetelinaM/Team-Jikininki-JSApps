import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from 'classUser';
import Item from 'classItem';
import List from 'classList';
import toastr from 'toastr';
import ErrorDiv from 'classErrorDiv';
import validations from 'validations';
import { setLocalStorage } from 'localStorage';
// import * as usersController from 'usersController';
import database from 'database';
import dashBEvenets from 'dashboardEvents';

function login(context) {
    // Render login template
    templates.get('login').then(function (template) {
        context.$element().html(template());

        $('#fb-login').on('click', () => {

            FB.login((response) => {
                if (response.status === 'connected') {
                    FB.api('/me', (userInfo) => {
                        setLocalStorage('username', userInfo.name);
                        setLocalStorage('uid', userInfo.id);
                    });
                };
            }, { scope: 'email' });

            context.redirect('#/dashboard');
        });

        $('#btn-login').on('click', function () {

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
                    setLocalStorage('uid', user.uid);
                    setLocalStorage('username', user.displayName);
                    context.redirect('#/dashboard');
                });
        });
    });
}

function signup(context) {
    templates.get('signup').then(function (template) {
        context.$element().html(template());

        $("#btn-signup").on('click', function () {
            // Get input data from signup fields
            let password = $('#password').val();
            let confirmedPassword = $('#confirmPassword').val();
            let fullname = $('#fullname').val();
            let username = $('#username').val();
            let email = $('#email').val();
            //let passHash = CryptoJS.SHA1(password).toString();
            let passHash = password;

            // Fields validation
            validations.allFieldsRequired(fullname, username, email, passHash);

            // Password validation
            validations.passwordCheck(password, confirmedPassword);

            // Mail validation
            validations.mailValidation(email);

            // Other fields validation here 
            // ......................

            // Create a new user with passed data
            let user = new User(fullname, username, email, passHash);

            // 
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

function loadItems(selectedListKey) {
    // TODO
}

function dashboard(context) {
    let userData = {};
    let template;
    templates.get('user-dashboard')
        .then(function (resTemplate) {
            template = resTemplate;
            firebase.database().ref('lists/' + localStorage.uid).on('value', (data) => {
                if (data.val() === null || data.val() === undefined) {
                    let firstUserList = new List('Test01', 'Test01', 'Test01');
                    firstUserList.addItem(new Item('title', false));
                    firebase.database().ref('lists/' + localStorage.uid).push(firstUserList);
                }
            });
            return database.getLists();
        })
        .then(function (data) {
            let lists = [];
            let resultLists = data.val();
            let keys = Object.keys(resultLists);
            keys.forEach(key => {
                let list = resultLists[key];
                lists.push({ key: key, title: list._title, glyphicon: list._glyphicon });
            });
            return lists;
        })
        .then(function (lists) {
            userData = { username: localStorage.username, lists: lists };
            context.$element().html(template(userData));
            dashBEvenets.btnAddList();
        })
        .then(function () {
            dashBEvenets.listTitle();
        });
}

export { login, signup, signOut, dashboard };
