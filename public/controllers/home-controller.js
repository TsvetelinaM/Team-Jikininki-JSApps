import * as templates from 'templates';
import  "bootstrap";

function all(context) {
    templates.get('home').then(function(template) {
        context.$element().html(template());
    })
}

export { all };
