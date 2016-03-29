'use strict';

/**
  * Controller for a lower level list
**/

angular.module('todo-app.lists.lower-level')
  .controller('LowerLevelController', LowerLevelController);

LowerLevelController.$inject = ['$stateParams', 'TodoLists', '$ionicPopup', '$scope', '$ionicModal'];

function LowerLevelController($stateParams, TodoLists, $ionicPopup, $scope, $ionicModal) {
  var vm = this;

  // Data
  vm.list = TodoLists.getList($stateParams.listId);
  /* Refresh todo items before entering this view */
  $scope.$on('$ionicView.beforeEnter', refreshItems);
  vm.shouldShowAddNew = false;
  vm.newTodo = {
    text: ''
  };

  // Methods
  vm.add = add;
  vm.refreshItems = refreshItems;
  vm.showSettings = showSettings;

  // Method implementation
  function refreshItems() {
    vm.list.todos.map(function (todo) {
      if (todo.type === 'list') {
        var progress = TodoLists.getListProgress(todo);
        todo.progress = progress;
      }
      return todo;
    });
    $scope.$broadcast('scroll.refreshComplete');
  }

  function add(todoText) {
    TodoLists.addTodo(vm.list, todoText);
    vm.shouldShowAddNew = false;
    vm.newTodo.text = '';
    refreshItems();
  }

  function showSettings () {
    $ionicModal.fromTemplateUrl('templates/settings-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });

    $scope.closeModal = function () {
      $scope.modal.hide();
      refreshItems();
    };
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
  }

}
