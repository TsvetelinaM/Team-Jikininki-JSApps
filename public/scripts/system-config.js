System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': 'libs/plugin-babel.js',
   'systemjs-babel-build': 'libs/systemjs-babel-browser.js',

   // App files
   'main': 'scripts/main.js',
   'users': 'scripts/userAccounts.js',

   // Library files
   'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'
 }
});

System.import('main');
