import * as templates from 'templates';

function all(context) {
    templates.get('home').then(function(template) {
        context.$element().html(template());
    })
}

export { all };
