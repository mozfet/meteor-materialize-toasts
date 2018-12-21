Package.describe({
  name: 'mozfet:materialize-toast',
  version: '0.0.1',
  summary: 'Tagged MaterializeCSS toasts makes for organised closing.',
  git: 'https://github.com/mozfet/meteor-materialize-toasts.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.1');
  api.use('ecmascript');
  api.mainModule('materialize-toast.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mozfet:materialize-toast');
  api.mainModule('materialize-toast-tests.js');
});
