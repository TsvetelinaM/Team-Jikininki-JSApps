import * as templates from 'templates';
import CryptoJS from 'cryptojs';
import User from 'classUser';
import Item from 'classItem';
import List from 'classList';
import toastr from 'toastr';
import ErrorDiv from 'classErrorDiv';
import validations from 'validations';
import { setLocalStorage } from 'localStorage';
import * as usersController from 'usersController';

function login(context) {
    templates.get('login').then(function (template) {
        context.$element().html(template());
        
        $('#fb-login').on('click',() => {

          FB.login((response) =>{
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
            user.add();

            // let newUser = new Promise((resolve) => {
            //     firebase.database().ref('users').push(new User(fullname, username, email, passHash));
            //     firebase.auth().createUserWithEmailAndPassword(email, passHash);
            //
            //     setTimeout(function () {
            //         resolve(firebase.auth().currentUser);
            //     }, 2000);
            // });
            //
            // newUser.then((currentUser) => {
            //     currentUser.updateProfile({
            //         displayName: username
            //     }).then(function () {
            //         console.log(firebase.auth().currentUser.displayName);
            //     }, function (error) {
            //       //  console.log('error with currentUser auth');
            //     });
            //   setLocalStorage('uid', currentUser.uid);
            //   setLocalStorage('username', currentUser.displayName);
            //   console.log(setLocalStorage.username);
            // })
            // .then(() => {
            //   let firstUserList = new List('Test01', 'Test01', 'Test01');
            //   firstUserList.addItem(new Item('title', false))
            //   firebase.database().ref('lists/' + localStorage.uid).push(firstUserList);
            // })
            // .then(() =>{
            //   context.redirect('#/dashboard');
            //   console.log(firebase.auth().currentUser.displayName);
            // });

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
        logo: './css/logo.png',
        backgroundColor: '#5f9ea0',
        loadingHtml: '<div class="spinner"></div>'
    });
    return window.loading_screen;
}

function dashboard(context) {
    let userData = {};
    let lists = [];
    let template;

    templates.get('user-dashboard')
        .then(function (resTemplate) {
            template = resTemplate;
            firebase.database().ref('lists/' + localStorage.uid).on('value',(data) => {
              if (data.val()===null || data.val()===undefined) {
                  let firstUserList = new List('Test01', 'Test01', 'Test01');
                  firstUserList.addItem(new Item('title', false))
                  firebase.database().ref('lists/' + localStorage.uid).push(firstUserList);
              };
            });
            let databaseRef = firebase.database().ref('lists/' + localStorage.uid);

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
                firebase.database().ref('lists/' + localStorage.uid + '/' + selectedListKey).once('value')
                    .then(function (list) {
                        let items = list.val()._items;
                        templates.get('user-list')
                            .then(function (template) {
                                let listObject = { title: list.val()._title, items: items }
                                $("#dashboard-welcome").addClass("hidden");
                                $("#main-board").html(template(listObject));
                            })
                            .then(function () {
                                $("#btn-add-item").on("click", function () {
                                    let $inputAddItem = $("#input-add-item");
                                    let inputValue = $inputAddItem.val();
                                    if (inputValue !== null && inputValue !== "") {
                                        let newItem = new Item(inputValue, false);
                                        firebase.database().ref('lists/' + localStorage.uid + '/' + selectedListKey + '/_items')
                                            .push(newItem);
                                        location.reload(); // Fix this to load only template
                                    } else {
                                        toastr.error("Cannot add empty task to the list.");
                                    }
                                });

                                $(".checkbox-task").on("click", function () {
                                    let key = $(this).attr("item-key-attribute");
                                    let itemRef = firebase.database().ref('lists/' + localStorage.uid + '/' + selectedListKey + '/_items/' + key);
                                    if ($(this).is(':checked')) {
                                        itemRef.once('value', function (item) {
                                            item.ref.update({
                                                "_checked": true
                                            });
                                            location.reload(); // Fix this to load only template
                                        });
                                    } else {
                                        itemRef.once('value', function (item) {
                                            item.ref.update({
                                                "_checked": false
                                            });
                                            location.reload(); // Fix this to load only template
                                        });
                                    }
                                });

                                $(".item-trash").on('click', function() {
                                    let key = $(this).prev().attr("item-key-attribute");
                                    let itemRef = firebase.database().ref('lists/' + localStorage.uid + '/' + selectedListKey + '/_items/' + key);
                                    itemRef.remove();
                                    location.reload();
                                });
                            });
                    });
            });
        });
}

export { login, signup, signOut, dashboard, loadingScreen };
