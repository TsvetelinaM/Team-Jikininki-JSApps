// frameworks
import CryptoJS from 'cryptojs';
import toastr from 'toastr';

// CUSTOM
// app modules
import validations from 'validations';
import validator from 'validator';

// models
import User from 'classUser';
import Item from 'classItem';
import List from 'classList';
import TaskItem from 'classTaskItem';
import ProductItem from 'classProductItem';


// DOM manipulation
import * as templates from 'templates';
import elementSelector from 'elements';
import ErrorDiv from 'classErrorDiv';

// data
import { setLocalStorage } from 'localStorage';
import database from 'database';
import dashBEvenets from 'dashboardEvents';

// MY PROPOSAL OF EXTRACTING FBLOGIN FROM LOGIN FUNCTION
// FUNCTION LOGIN BELOW DOES TOO MANY THINGS
//
// function fbLogin(context) {
//     templates.get('login').then(function (template) {
//         context.$element().html(template());

//         $(elementSelector.fbLoginButton).on('click',() =>{
//           FB.login((response) =>{
//             if (response.status === 'connected') {
//               FB.api('/me', (userInfo) => {
//                  setLocalStorage('username', userInfo.name);
//                  setLocalStorage('uid', userInfo.id);
//               });
//             };
//          });
//         context.redirect('#/dashboard');
//         });
//     });
// }

function login(context) {
    templates.get('login').then(function (template) {
        context.$element().html(template());

        $(elementSelector.fbLoginButton).on('click',() =>{
          FB.login((response) =>{
            if (response.status === 'connected') {
              FB.api('/me', (userInfo) => {
                 setLocalStorage('username', userInfo.name);
                 setLocalStorage('uid', userInfo.id);
              });
            };
         });

         firebase.database().ref('lists/' + localStorage.uid).once('value')
          .then ((data) => {
            console.log(data.val());
             if (data.val() === null || data.val() === undefined) {
               // Adding the Home list for the user
               const homeList = new List("Home");
               homeList.description = "A list with home tasks";
               homeList.glyphicon = "glyphicon glyphicon-home";
               homeList.addItem(new TaskItem('Example item', false, ""));



               // Adding shopping list
               const shoppingList = new List("Shopping list");
               shoppingList.description = "A list for stuff to buy";
               shoppingList.glyphicon = "glyphicon glyphicon-shopping-cart";
               shoppingList.addItem(new ProductItem('Example grocery item', false, 1));

               database
                   .pushList(shoppingList)
                   .then(() => {
                     database
                         .pushList(homeList);

                   })
                     .then(() => {
                     // Reloading the page to dashboard
                     context.redirect('#/dashboard');
                     location.reload();
                   });
             } else {
               context.redirect('#/dashboard');
               location.reload();
             }
         });

        });

        $(elementSelector.loginButton).on('click', function () {
            try {
                let password = $(elementSelector.passwordInput).val();
                validator.isStringEmptyOrWhitespace(password);
                let passHash = CryptoJS.SHA1(password).toString();

                let email = $(elementSelector.emailInput).val();
                validator.isStringEmptyOrWhitespace(email);
                validator.isEmailValid(email);

                database.signInUser(email, passHash)
                    .then(function (user) {
                        setLocalStorage('uid', user.uid);
                        setLocalStorage('username', user.displayName);
                        context.redirect('#/dashboard');
                    });
            }
            catch (err) {
                toastr.error(err.name + ": " + err.message);
            }
        });
    });
}

function signup(context) {
    templates.get('signup').then(function (template) {
        context.$element().html(template());

        $(elementSelector.signupButton).on('click', function () {
            try {
                let password = $(elementSelector.passwordInput).val(),
                    confirmPassword = $(elementSelector.confirmPassword).val();

                validator.isStringEmptyOrWhitespace(password);
                validator.isPasswordValid(password);

                validator.isStringEmptyOrWhitespace(confirmPassword);
                validator.isPasswordValid(confirmPassword);

                validator.passwordMatch(password, confirmPassword);

                let fullname = $(elementSelector.fullNameInput).val();
                validator.isStringEmptyOrWhitespace(fullname);

                let username = $(elementSelector.userNameInput).val();
                validator.isStringEmptyOrWhitespace(username);

                let email = $(elementSelector.emailInput).val();
                validator.isStringEmptyOrWhitespace(email);
                validator.isEmailValid(email);

                let passHash = CryptoJS.SHA1(password).toString();

                let user = new User(fullname, username, email, passHash);
                
                user.add(context);

                toastr.success("You have been successfully signed up!");
            }
            catch (err) {
                toastr.error(err.name + ": " + err.message);
            }
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
        }).catch(function (err) {
            toastr.error(err.name + ": " + err.message);
        })
}

function dashboard(context) {
    let userData = {};
    let template;
    templates.get('user-dashboard')
        .then(function (resTemplate) {
            template = resTemplate;
            
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

            dashBEvenets.btnAddList(context);
        })
        .then(function () {
            dashBEvenets.listTitle(context);
        });
}

export { login, signup, signOut, dashboard };
