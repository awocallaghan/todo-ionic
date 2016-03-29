'use strict';

/**
  * NewItemController - controller for creating a new item in a list
  * - 2 types:
  *   - 'list' : { type: 'list', name, todos }
  *   - 'task' : { type: 'task', text, deadline }
**/

angular.module('todo-app.lists.new-item')
  .controller('NewItemController', NewItemController);

NewItemController.$inject = ['$stateParams', '$location', 'TodoLists', '$ionicHistory'];

function NewItemController($stateParams, $location, TodoLists, $ionicHistory) {
  var vm = this;

  // Data
  vm.list = TodoLists.getList($stateParams.listId);
  vm.newTodo = {
    type : '',
    name : '',
    text : ''
  };

  // Methods
  vm.add = add;

  // Method implementation
  function add (todo) {
    switch (todo.type) {
      case 'list':
        TodoLists.addList(todo.name, vm.list);
        break;
      case 'task':
        TodoLists.addTodo(todo.text, vm.list);
        break;
    }
    $ionicHistory.goBack();
  }

}
