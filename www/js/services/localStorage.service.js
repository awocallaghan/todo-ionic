angular.module('todo-app.services')
  .service('LocalStorageService', LocalStorageService);

function LocalStorageService () {
  var hasLocalStorage = checkLocalStorage;

  if (hasLocalStorage) console.log('Using local storage');
  else console.log('Local storage not found');

  return {
    serializeData : serializeData,
    deserializeData : deserializeData
  };

  function checkLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  function serializeData(newData) {
    localStorage['data'] = JSON.stringify(newData);
    console.log('Data saved');
  }

  function deserializeData() {
    var newData, rawData = localStorage['data'];
    if (rawData) {
      console.log(rawData);
      newData = JSON.parse(rawData);
      return newData;
    }
    return {
      lists: [],
      lastItemId: 0
    };
  }
}
