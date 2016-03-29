'use strict';

/**
  * Controller for list ion-item
  * - Shows popup dialog when user swipes to delete
**/

angular.module('todo-app.lists.list-item')
  .controller('ListItemController', ListItemController);

ListItemController.$inject = ['TodoLists', '$ionicPopup'];
function ListItemController (TodoLists, $ionicPopup) {
  var vm = this;

  // Methods
  vm.delete = deleteList;

  // Show confirm popup when deleting
  function deleteList(list) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete todo list',
      template: 'Are you sure you want to delete list "' + list.name + '"?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        TodoLists.deleteList(list);
      }
    });
  }
}
