System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': '../libs/systemjs-plugin-babel/plugin-babel.js',
   'systemjs-babel-build': '../libs/systemjs-plugin-babel/systemjs-babel-browser.js',

   // App files
   'main': '../scripts/main.js',
   'homeController': '../controllers/home-controller.js',
   'usersController': '../controllers/users-controller.js',
   'templates': '../scripts/templates.js',
   'validations': '../scripts/input-validations.js',
   'localStorage': '../scripts/local-storage.js',
   'helpers': '../scripts/helpers.js',
   'database': '../scripts/database.js',
   'dashboardEvents': '../scripts/dashboard-events.js',
   'elements' : '../scripts/elements.js',
   'validator' : '../scripts/validator.js',

   //for tests only
   'test': './ValidatorTests.js',


   //models
   'classUser': '../models/User.js',
   'classErrorDiv': '../models/ErrorDiv.js',
   'classCategory': '../models/Category.js',
   'classList': '../models/List.js',
   'classItem': '../models/Item.js',
   'classProductItem': '../models/ProductItem.js',
   'classTaskItem': '../models/TaskItem.js',

   // Library files
   'jquery': '../libs/jquery.js',
   'jqueryUI': '../libs/jquery-ui.js',
   'handlebars': '../libs/handlebars.js',
   'sammy': '../libs/sammy.js',
   'cryptojs': '../libs/crypto-js.js',
   'toastr': '../libs/toastr.js',
   'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min.js'
 }
});
