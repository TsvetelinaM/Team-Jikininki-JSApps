// frameworks
import CryptoJS from 'cryptojs';
import toastr from 'toastr';

// CUSTOM
// app modules
import validations from 'validations';

// models
import User from 'classUser';
import Item from 'classItem';
import List from 'classList';

// DOM manipulation
import * as templates from 'templates';
import elementSelector from 'elements';
import ErrorDiv from 'classErrorDiv';

// data
import { setLocalStorage } from 'localStorage';
import database from 'database';
import dashBEvenets from 'dashboardEvents';

function login(context) {
    templates.get('login').then(function (template) {
        context.$element().html(template());

        $('#fb-login').on('click',() =>{
          FB.login((response) =>{
            if (response.status === 'connected') {
              FB.api('/me', (userInfo) => {
                 setLocalStorage('username', userInfo.name);
                 setLocalStorage('uid', userInfo.id);
              });
            };
         });
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
            database.signInUser(email, password)
                .then(function (user) {
                    setLocalStorage('uid',user.uid);
                    setLocalStorage('username',user.displayName);
                    context.redirect('#/dashboard');
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
            let user = new User(fullname, username, email, passHash);
            user.add(context);
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

function dashboard(context) {
    let userData = {};
    let template;
    templates.get('user-dashboard')
        .then(function (resTemplate) {
            template = resTemplate;
            // firebase.database().ref('lists/' + localStorage.uid).on('value', (data) => {
            //     if (data.val() === null || data.val() === undefined) {
            //         let firstUserList = new List('Test01', 'Test01', 'Test01');
            //         firstUserList.addItem(new Item('title', false));
            //         firebase.database().ref('lists/' + localStorage.uid).push(firstUserList);
            //     }
            // });
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
