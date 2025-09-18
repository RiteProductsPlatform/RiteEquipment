define([], () => {
  'use strict';

  class PageModule {

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      return formattedDate;
    }

    columnsheaderGenerator(myrestdata) {
      let restdata = JSON.parse(myrestdata);

      // Function to format header text from field names like 'effective_start_date' to 'Effective Start Date'
      function formatHeaderText(field) {
        return field
          .replace(/_/g, ' ')  // Replace underscores with spaces
          .split(' ')  // Split by spaces
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
          .join(' ');  // Join back into a single string
      }

      if (Array.isArray(restdata)) {
        // If data is an array, handle objects inside the array
        if (restdata.length > 0 && typeof restdata[0] === 'object') {
          const headers = Object.keys(restdata[0]);

          const validColumns = headers.filter(field => {
            return restdata.some(item => item[field] !== null && item[field] !== "") &&
              field !== 'report_name' && field !== 'equipment_id';
          });

          // Map valid columns to formatted headers
          const columns = validColumns.map(field => {
            const column = {
              "headerText": formatHeaderText(field),
              "field": field
            };

            // Add specific properties for date fields
            if (field === "effective_start_date" || field === "effective_end_date") {
              column["template"] = "date";
            }

            return column;
          });

          return columns;
        } else {
          throw new Error("Array elements are not objects.");
        }
      } else if (typeof restdata === 'object') {
        // If data is an object, handle it directly
        const headers = Object.keys(restdata);

        const validColumns = headers.filter(field => {
          return restdata[field] !== null && restdata[field] !== "" &&
            field !== 'report_name' && field !== 'equipment_id';
        });

        // Map valid columns to formatted headers
        const columns = validColumns.map(field => ({
          "headerText": formatHeaderText(field),
          "field": field
        }));

        return columns;
      } else {
        throw new Error("Expected data to be an object or array of objects.");
      }
    }



    csvdownload(mydata, filename) {
      let data = JSON.parse(mydata)

      let keys = Object.keys(data[0]);


      let headers = keys.map(function (key) {

        return key.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
          return char.toUpperCase();
        });
      });
      let result = '';
      result += headers.join(',');
      result += '\n';
      data.forEach(function (item) {
        keys.forEach(function (key) {
          result += item[key] + ',';
        });
        result += '\n';
      });
      let csv = 'data:text/csv;charset=utf-8,' + result;
      let excel = encodeURI(csv);
      let link = document.createElement('a');
      link.setAttribute('href', excel);
      link.setAttribute('download', filename + '.csv');
      link.click();
    }




    pieChartData(mydata) {
      let equipmentArray = JSON.parse(mydata);
      let equipmentCount = {};

      equipmentArray.forEach(item => {
        const equipmentClass = item.equipment_class;
        const equipmentName = item.equipment_name;


        const key = equipmentClass || equipmentName;


        if (equipmentCount[key]) {
          equipmentCount[key]++;
        } else {
          equipmentCount[key] = 1;
        }
      });
      let items = [];
      let newID = 1;
      for (let key in equipmentCount) {
        items.push({
          id: newID++,
          group: 'Equipment',
          series: key,
          value: equipmentCount[key]
        });
      }

      return items;
    }

  }

  return PageModule;
});
