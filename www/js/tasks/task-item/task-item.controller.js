'use strict';

/**
  * TaskItemController - controller for ion-item representing a task
**/

angular.module('todo-app.tasks.task-item')
  .controller('TaskItemController', TaskItemController);

TaskItemController.$inject = ['TodoLists', '$ionicPopup', '$state', '$ionicListDelegate'];
function TaskItemController (TodoLists, $ionicPopup, $state, $ionicListDelegate) {
  var vm = this;

  // Methods
  vm.delete = deleteTask;
  vm.info = info;

  function deleteTask(task) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete task',
      template: 'Are you sure you want to delete task "' + task.text + '"?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        TodoLists.deleteTodo(task);
      }
    });
  }

  function info(task) {
    $state.go('tab.view-task', {
      listId: task.parentId,
      taskId: task.id
    });
  }
}
