'use strict';

angular.module('todo-app.services')
  .factory('TodoLists', TodoLists);

TodoLists.$inject = ['LocalStorageService'];

function TodoLists (LocalStorageService) {
  var _this = {
    all : all,
    getList : getList,
    deleteList : deleteList,
    reorderList : reorderList,
    addList : addList,
    addTodo : addTodo,
    deleteTodo : deleteTodo,
    getTodo : getTodo,
    getListProgress : getListProgress,
    saveData : saveData
  }

  // Our list data from local storage
  // data.lists = array of lists
  // data.lastItemId = id of last item added
  var data = LocalStorageService.deserializeData();

  function saveData() {
    LocalStorageService.serializeData(data); // update local storage
  }

  /*
    Return all lists
  */
  function all () {
    return data.lists;
  }

  /*
    Get a list by given listId, searches children recursively (depth first)
    @param listId - id of list to find
    @return list object or null
  */
  function getList (listId) {
    for (var i = 0; i < data.lists.length; i++) {
      var list = data.lists[i];
      var search = getListRecursive (listId, list);
      if (search !== null) {
        return search;
      }
    }
    return null;
  }

  /*
    Recursive local function used for searching for lists and their children
    @param listId - id we are searching for
    @param list - list to search
    @return list object or null
  */
  function getListRecursive (listId, list) {
    if (list.id == listId) return list;

    for (var j = 0; j < list.todos.length; j++) {
      if (list.todos[j].type === 'list') {
        var search = getListRecursive (listId, list.todos[j]);
        if (search !== null) return search;
      }
    }
    return null;
  }

  /*
    Get current progress of tasks in list
    @param list - list to get progress for
    @return array #len = 2 - array[0] = number of tasks completed, array[1] = total number of tasks within list
  */
  function getListProgress (list) {
    var total = 0;
    var completed = 0;

    for (var i = 0; i < list.todos.length; i++) {
      var todo = list.todos[i];

      if (todo.type === 'task') {
        total++;
        if (todo.completed) completed++;
      }
      else if (todo.type === 'list') {
        var progress = getListProgress(todo);
        completed += progress[0];
        total += progress[1];
      }
    }
    return [completed, total];
  }

  /*
    Reorder lists in top level
    @param list - list to move
    @param fromIndex - index currently at
    @param toIndex - index to move list to
  */
  function reorderList (list, fromIndex, toIndex) {
    data.lists.splice(fromIndex, 1);
    data.lists.splice(toIndex, 0, list);
    saveData();
  }

  /*
    Add a new list
    @param name - name for list
    @param parent - parent list or null if top level
  */
  function addList (name, parent) {
    data.lastItemId++;
    var list = {
      id: data.lastItemId,
      type: 'list',
      name: name,
      todos: []
    };
    if (parent === null) {
      data.lists.push(list);
    } else {
      list.parentId = parent.id;
      parent.todos.push(list);
    }
    saveData();
  }

  /*
    Delete a todo list
    @param list - list to delete
  */
  function deleteList (list) {
    if (list.parentId == null) {
      data.lists.splice(data.lists.indexOf(list), 1);
    } else {
      var parent = getList(list.parentId);
      parent.todos.splice(parent.todos.indexOf(list), 1);
    }
    saveData();
  }

  /*
   Add a new todo task
   @param todoText - text of todo item
   @param list - list to add todo to
  */
  function addTodo (todoText, list) {
    data.lastItemId++;
    list.todos.push({
      id: data.lastItemId,
      parentId: list.id,
      type: 'task',
      text: todoText,
      completed: false
    });
    saveData();
  }

  /*
    Delete a todo
    @param todo = todo to delete
  */
  function deleteTodo (todo) {
    var parent = getList(todo.parentId);
    parent.todos.splice(parent.todos.indexOf(todo), 1);
    saveData();
  }

  /*
   Get todo task
   @param listId - id of list containing todo
   @param todoId - id of todo task
   @return todo object or null
  */
  function getTodo (listId, todoId) {
    var list = getList(listId);
    for (var i = 0; i < list.todos.length; i++) {
      if (list.todos[i].id == todoId) return list.todos[i];
    }
    return null;
  }

  return _this;
}
