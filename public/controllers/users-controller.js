import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from 'classUser';
import Item from 'classItem';
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
    let userData = {};
    let lists = [];
    let template;

    templates.get('user-dashboard')
        .then(function (resTemplate) {
            template = resTemplate;
            let databaseRef = firebase.database().ref('lists/' + localStorage.username);
            return databaseRef.once('value');
        })
        .then(function (data) {
            let resultLists = data.val();
            let keys = Object.keys(resultLists);
            keys.forEach(key => {
                let list = resultLists[key];
                lists.push({ key: key, title: list._title, glyphicon: list._glyphicon });
            });
        })
        .then(function () {
            userData = { username: localStorage.username, lists: lists };
            context.$element().html(template(userData));
        })
        .then(function () {
            $('.list-title').on('click', function (event) {
                event.preventDefault();
                $(".active").removeClass("active");
                $(this).addClass("active");
                let selectedListKey = $(".active > a > span").attr("data-atribute");
                firebase.database().ref('lists/' + localStorage.username + '/' + selectedListKey).once('value')
                    .then(function (list) {
                        let items = list.val()._items;
                        templates.get('user-list')
                            .then(function (template) {
                                let listObject = { title: list.val()._title, items: items }
                                $("#dashboard-welcome").addClass("hidden");
                                $("#main-board").html(template(listObject));
                            })
                            .then(function() {
                                $("#btn-add-item").on("click", function () {
                                    let $inputAddItem = $("#input-add-item");
                                    let inputValue = $inputAddItem.val();
                                    if(inputValue !== null && inputValue !== "") {
                                        let newItem = new Item(inputValue, false);
                                        firebase.database().ref('lists/' + localStorage.username + '/' + selectedListKey + '/_items')
                                        .push(newItem);
                                        location.reload(); // Fix this to load only template
                                    } else {
                                        toastr.error("Cannot add empty task to the list.");
                                    }
                                });
                                $(".checkbox-task").on("click", function() {
                                    if($(this).is(':checked')) {
                                        console.log("checked now");
                                    } else {
                                        console.log("not checked now");
                                    }
                                });
                            })
                    });
            });
        });
}

export { login, signup, signOut, showDashboard, loadingScreen };
