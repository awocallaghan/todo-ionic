'use strict';

/**
  * <taskItem> directive - represent a task as an ion-item in an ion-list
  * @param task : task object
**/

angular.module('todo-app.tasks.task-item')
  .directive('taskItem', TaskItem);

function TaskItem () {
  return {
    restrict: 'E',
    scope: {
      task: '='
    },
    templateUrl: 'templates/task-item.html',
    controller: 'TaskItemController',
    controllerAs: 'vm'
  }
}
