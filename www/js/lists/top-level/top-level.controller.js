'use strict';

/**
  * TopLevelController - controller for ion-list of task lists at the top level
  * - items in list are only lists, no tasks
**/

angular.module('todo-app.lists.top-level')
  .controller('TopLevelController', TopLevelController);

TopLevelController.$inject = ['$scope', 'TodoLists', '$ionicPopup'];

function TopLevelController ($scope, TodoLists, $ionicPopup) {
  var vm = this;

  // Data
  vm.lists = [];
  /* Refresh items after entering this view */
  $scope.$on('$ionicView.beforeEnter', refreshItems);
  vm.shouldShowEdit = false;
  vm.shouldShowAddNew = false;
  vm.newList = {
    name: ''
  };

  // Methods
  vm.refreshItems = refreshItems;
  vm.delete = confirmDelete;
  vm.reorder = reorderList;
  vm.add = add;

  // Method implementation
  function refreshItems() {
    vm.lists = TodoLists.all()
                        .map(function (list) {
                          var progress = TodoLists.getListProgress(list);
                          list.progress = progress;
                          return list;
                        });
    $scope.$broadcast('scroll.refreshComplete');
  }

  function add(listName) {
    TodoLists.addList(listName, null);
    vm.shouldShowAddNew = false;
    vm.newList.name = '';
    refreshItems();
  }

  function reorderList(list, fromIndex, toIndex) {
    TodoLists.reorderList(list, fromIndex, toIndex);
    refreshItems();
  }

  function confirmDelete(list) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete todo list',
      template: 'Are you sure you want to delete "' + list.name + '"?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        TodoLists.deleteList(list);
        refreshItems();
      }
    });
  }
}
