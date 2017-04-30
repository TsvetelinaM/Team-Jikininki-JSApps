import 'jquery';
import Handlebars from 'handlebars';

function get(templateName) {
    let promise = new Promise((resolve, reject) => {
        let url = 'templates/' + templateName + '.handlebars';

        $.ajax({
            url: url,
            success: function(html) {
                let template = Handlebars.compile(html);
                resolve(template);
            }
        });
    });

    return promise;
}

export { get }
