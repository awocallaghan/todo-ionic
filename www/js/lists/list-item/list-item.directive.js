'use strict';

/**
  * <todo-list-item> directive - represent a list of tasks as an ion-item within an ion-list
  * @param list : the list object
  * @param parentList : the list containing this list
**/

angular.module('todo-app.lists.list-item')
  .directive('todoListItem', ListItem);

function ListItem() {
  return {
    restrict: 'E',
    scope: {
      list: '=',
      parentList: '='
    },
    templateUrl: 'templates/list-item.html',
    controller: 'ListItemController',
    controllerAs: 'vm'
  };
}
