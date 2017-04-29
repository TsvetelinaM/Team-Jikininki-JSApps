import * as templates from 'templates';

function login(context) {
    templates.get('login').then(function(template) {
        context.$element().html(template());
    })
}

function signup(context) {
    templates.get('signup').then(function(template) {
        context.$element().html(template());
    })
}

export { login }
export { signup }