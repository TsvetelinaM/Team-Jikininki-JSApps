System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
   'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

   // App files
   'main': './scripts/main.js',
   'homeController': './controllers/home-controller.js',
   'usersController': './controllers/users-controller.js',
   'templates': './scripts/templates.js',
   'validations': './scripts/input-validations.js',
   'localStorage': './scripts/local-storage.js',

   //for tests only
   'test': './scripts/test.js',


   //models
   'classUser': './models/User.js',
   'classErrorDiv': './models/ErrorDiv.js',
   'classCategory': './models/Category.js',
   'classList': './models/List.js',
   'classItem': './models/Item.js',
   'classProductItem': './models/ProductItem.js',
   'classTaskItem': './models/TaskItem.js',

   // Library files
   'jquery': '../node_modules/jquery/dist/jquery.js',
   'handlebars': '../node_modules/handlebars/dist/handlebars.js',
   'sammy': '../node_modules/sammy/lib/sammy.js',
   'cryptojs': '../node_modules/crypto-js/crypto-js.js',
   'toastr': '../node_modules/toastr/toastr.js',
   'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap.min.js'
 }
});

System.import('main');
