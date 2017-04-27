System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
   'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

   // App files
   'main': './scripts/main.js',
   'users': './scripts/userAccounts.js',
   'homeController': './controllers/home-controller.js',
   'usersController': './controllers/users-controller.js',

   // Library files
   'jquery': '../node_modules/jquery/dist/jquery.js',
   'handlebars': '../node_modules/handlebars/handlebars.amd.js',
   'sammy': '../node_modules/sammy/lib/sammy.js',
 }
});

System.import('main');
