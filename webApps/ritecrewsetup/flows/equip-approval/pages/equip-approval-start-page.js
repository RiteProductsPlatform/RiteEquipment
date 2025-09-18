define([], () => {
  'use strict';

  class PageModule {
    myset(value) {
      const arrayOfStrings = Array.from(value).map(item => String(item));
      return arrayOfStrings;
    }

    dateformatter(date) {
      return new Date(date).toISOString().split('T')[0];
    }


    checkfilterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(JSON.stringify(mydata));
      var keys = [];
      var filteredData = [];
      if (selected.row.isAddAll()) {
        var iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.equipment_id === obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.equipment_id === obj2;
          });
        });
      }
      return filteredData;
    };

  }

  return PageModule;
});
