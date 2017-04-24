System.config({
  transpiler: 'plugin-babel',
  map: {
    // System.js files
   'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
   'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

   // App files
   'main': 'scripts/main.js',
   'users': 'scripts/userAccounts.js',

   // Library files
   'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'
 }
});

System.import('main');
