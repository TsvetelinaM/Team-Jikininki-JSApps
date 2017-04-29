import 'jquery';
import Handlebars from 'handlebars';

function get(templateName) {
    var promise = new Promise((resolve, reject) => {
        var url = 'templates/' + templateName + '.handlebars';

        $.ajax({
            url: url, 
            success: function(html) {
                var template = Handlebars.compile(html);
                resolve(template);
            }
        });
    });

    return promise;
}

export { get }