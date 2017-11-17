// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.service('sharedProperties', function () {
        var id_utente;

        return {
            getIdUtente: function () {
                return id_utente;
            },
            setIdUtente: function(value) {
                id_utente = value;
            }
        };
    })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.portafoglio', {
    url: '/portafoglio',
    views: {
      'menuContent': {
        templateUrl: 'templates/portafoglio.html',
        controller: 'PortafoglioCtrl'
      }
    }
  })

  .state('app.entrate', {
      url: '/entrate',
      views: {
        'menuContent': {
          templateUrl: 'templates/entrate.html',
          controller: 'EntrateCtrl'
        }
      }
    })

    .state('app.uscite', {
        url: '/uscite',
        views: {
          'menuContent': {
            templateUrl: 'templates/uscite.html',
            controller: 'UsciteCtrl'
          }
        }
      })

    .state('app.profilo', {
        url: '/profilo',
        views: {
          'menuContent': {
            templateUrl: 'templates/profilo.html',
            controller: 'ProfiloCtrl'
          }
        }
      })

      .state('app.tabs', {
        url: '/tabs',
        views: {
          'menuContent': {
            templateUrl: 'templates/tabs.html'

          }
        }
      })



    .state('app.tabs.cronologiaEntrate', {
      url: '/cronologiaEntrate',
      views: {
        'tabs-cronologiaEntrate': {
          templateUrl: 'templates/cronologiaEntrate.html',
          controller: 'CronologiaEntrateCtrl'
        }
      }
    })

    .state('app.tabs.cronologiaUscite', {
        url: '/cronologiaUscite',
        views: {
          'tabs-cronologiaUscite': {
            templateUrl: 'templates/cronologiaUscite.html',
            controller: 'CronologiaUsciteCtrl'
          }
        }
      });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
