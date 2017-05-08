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
import $selectElement from 'elements';
import ErrorDiv from 'classErrorDiv';

// data
import { setLocalStorage } from 'localStorage';
import database from 'database';

function login(context) {
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

    // Render dashboard template with no selected lists
    templates.get('user-dashboard')
        .then(function (resTemplate) {
            template = resTemplate;
            // Fix this
            firebase.database().ref('lists/' + localStorage.uid).on('value', (data) => {
                if (data.val() === null || data.val() === undefined) {
                    let firstUserList = new List('Test01', 'Test01', 'Test01');
                    firstUserList.addItem(new Item('title', false))
                    firebase.database().ref('lists/' + localStorage.uid).push(firstUserList);
                };
            });
            return database.getLists();
        })
        // Retrieve information about the list and process it
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
        // Render information in html template
        .then(function (lists) {
            userData = { username: localStorage.username, lists: lists };
            context.$element().html(template(userData));
            $selectElement.addListButton.on('click', function () {
                let listTitle = $('#input-add-list').val();
                if (listTitle == "") {
                    toastr.error("Cannot add list without a title.");
                } else {
                    let newList = new List(listTitle)
                    database.pushList(newList);
                    location.reload();
                    toastr.success("New list " + listTitle + " was added.");
                }
            });
        })
        // Add more functionality to dashboard after loading items from a list
        .then(function () {
            $('.list-title').on('click', function (event) {
                event.preventDefault();
                $(".active").removeClass("active");
                $(this).addClass("active");
                let selectedListKey = $(".active > a > span").attr("data-atribute");

                database.getSingleList(selectedListKey)
                    .then(function (list) {
                        let items = list.val()._items;
                        templates.get('user-list')
                            .then(function (template) {
                                let listObject = { title: list.val()._title, items: items }
                                $("#dashboard-welcome").addClass("hidden");
                                $("#main-board").html(template(listObject));
                            })
                            .then(function () {
                                // Adding item by setting its title
                                $("#btn-add-item").on("click", function () {
                                    let $inputAddItem = $("#input-add-item");
                                    let inputValue = $inputAddItem.val();
                                    if (inputValue !== null && inputValue !== "") {
                                        let newItem = new Item(inputValue, false, "", "");
                                        database.pushItem(selectedListKey, newItem);
                                        location.reload(); // Fix this to load only template
                                    } else {
                                        toastr.error("Cannot add empty task to the list.");
                                    }
                                });

                                // Adding event to checkbox button of each item
                                // and update item checked state accordingly
                                $(".checkbox-task").on("click", function () {
                                    let key = $(this).attr("item-key-attribute");
                                    if ($(this).is(':checked')) {
                                        database.updateItemCheckState(selectedListKey, key, true);
                                        location.reload(); // Fix this to load only template
                                    } else {
                                        database.updateItemCheckState(selectedListKey, key, false);
                                        location.reload(); // Fix this to load only template
                                    }
                                });

                                // Adding event to delete item from list
                                $(".item-trash").on('click', function () {
                                    let key = $(this).prev().attr("item-key-attribute");
                                    database.removeItem(selectedListKey, key);
                                    location.reload();
                                });

                                // Adding event to edit item from the list
                                // FIX add due data change
                                $(".edit-item").on('click', function (event) {
                                    templates.get('edit-item')
                                        .then(function (template) {
                                            let key = $(event.target).prev().prev().attr("item-key-attribute");
                                            database.getItem(selectedListKey, key)
                                                .then(function (item) {
                                                    let itemInfo = item.val();
                                                    // console.log(itemInfo);
                                                    $("#main-board").html(template(itemInfo));
                                                })
                                                .then(function () {
                                                    $(".save-item").on('click', function () {
                                                        console.log(event.target);
                                                        let itemKey = $(event.target).prev().prev().attr("item-key-attribute");

                                                        let newTitle = $("#edit-title").val();
                                                        database.updateItem(selectedListKey, itemKey, newTitle);

                                                        location.reload(); // FIX
                                                    });
                                                });
                                        });
                                });
                            });
                    });
            });
        });
}

export { login, signup, signOut, dashboard };
