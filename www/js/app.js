/**
  * todo-app
  * @author Alex O'Callaghan
  */
angular.module('todo-app',
    [ 'ionic',
      /* Features */
      'todo-app.about',                  /* app info tab */
      'todo-app.lists',                  /* task lists module */
      'todo-app.lists.top-level',        /* top level ion-list of task lists */
      'todo-app.lists.lower-level',      /* lower level: a task list containing tasks or deeper lists */
      'todo-app.lists.new-item',         /* create a new item inside list */
      'todo-app.lists.list-item',        /* item representing a list */
      'todo-app.tasks',                  /* tasks module */
      'todo-app.tasks.task-item',        /* item representing a todo task */
      'todo-app.tasks.view-task',        /* view a task in more detail and edit */
      /* Services */
      'todo-app.services',               /* general data services */
      /* External stuff */
      'ngStorage',
      'ion-datetime-picker',
      'angularMoment'
    ]
  )

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.lists', {
    url: '/lists',
    views: {
      'tab-lists': {
        templateUrl: 'templates/top-level-lists.html',
        controller: 'TopLevelController',
        controllerAs: 'vm'
      }
    }
  })
  .state('tab.list-detail', {
    url: '/list/:listId',
    views: {
      'tab-lists': {
        templateUrl: 'templates/lower-level-list.html',
        controller: 'LowerLevelController',
        controllerAs: 'vm'
      }
    }
  })
  .state('tab.new-todo', {
    url: '/newItem/list/:listId',
    views: {
      'tab-lists': {
        templateUrl: 'templates/new-item.html',
        controller: 'NewItemController',
        controllerAs: 'vm'
      }
    }
  })
  .state('tab.view-task', {
    url: '/list/:listId/task/:taskId/view',
    views: {
      'tab-lists': {
        templateUrl: 'templates/view-task.html',
        controller: 'ViewTaskController',
        controllerAs: 'vm'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/lists');

});
