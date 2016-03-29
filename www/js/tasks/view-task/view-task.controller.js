'use strict';

/**
  * ViewTaskController - controller for viewing more detailed info about a task
  * - Can edit task text and enable/set deadline date
**/

angular.module('todo-app.tasks.view-task')
  .controller('ViewTaskController', ViewTaskController);

ViewTaskController.$inject = ['$stateParams', 'TodoLists', '$ionicPopup', '$ionicHistory', '$scope'];
function ViewTaskController($stateParams, TodoLists, $ionicPopup, $ionicHistory, $scope) {
  var vm = this;

  // Data
  vm.task = TodoLists.getTodo($stateParams.listId, $stateParams.taskId);
  vm.edit = {
    text: false,
    deadline: false
  };
  vm.enableDeadline = vm.task.deadline ? true : false;

  // Method
  $scope.$on('$ionicView.beforeLeave', updateData);
  vm.toggleEdit = toggleEdit;
  vm.deleteTask = deleteTask;

  // Delete deadline if not enabled and save data
  function updateData() {
    if (!vm.enableDeadline) {
      vm.task.deadline = null;
    }
    TodoLists.saveData();
  }

  function toggleEdit(attr) {
    vm.edit[attr] = !vm.edit[attr];
  }

  function deleteTask() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete task',
      template: 'Are you sure you want to delete task "' + vm.task.text + '"?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        TodoLists.deleteTodo(vm.task);
        $ionicHistory.goBack(-1);
      }
    });
  }
}
