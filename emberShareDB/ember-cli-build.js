'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    codemirror: {
      addons: [
        'comment/comment.js',
        'mode/simple.js',
        'mode/multiplex.js',
        'hint/javascript-hint.js',
        'hint/show-hint.js',
        'hint/xml-hint.js',
        'hint/html-hint.js',
        'hint/css-hint.js',
        'hint/anyword-hint.js',
        'lint/lint.js',
        'lint/lint.css',
        'lint/css-lint.js',
        'hint/show-hint.css',
        'edit/matchbrackets.js',
        'search/search.js',
        'search/searchcursor.js',
        'dialog/dialog.js',
        'dialog/dialog.css',
        'fold/foldgutter.css',
        'fold/foldcode.js',
        'fold/foldgutter.js',
        'fold/brace-fold.js',
        'fold/xml-fold.js',
        'fold/indent-fold.js',
        'fold/comment-fold.js',
        'display/autorefresh.js',
      ],
      modes: ['xml', 'javascript', 'handlebars', 'htmlmixed', 'css'],
      themes: ['monokai', 'night', 'dracula'],
      keymaps: ['sublime'],
    },

    'ember-bootstrap': {
      bootstrapVersion: 3,
      importBootstrapFont: true,
      importBootstrapCSS: false,
    },
  })

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree()
}
