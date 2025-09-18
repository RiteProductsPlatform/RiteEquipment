
define(['mapbox-gl', 'mapboxsearch'], (mapboxgl, mapboxsearch) => {
  'use strict';

  class PageModule {
    uniquetasks(mydata) {
      let data = JSON.parse(JSON.stringify(mydata));
      const seen = new Set();
      const unique = [];
      for (const item of data) {
        if (!seen.has(item.TaskId)) {
          seen.add(item.TaskId);
          unique.push(item);
        }
      }
      return unique;
    }

     getUtilization(hrs) {
        const fullDayHours = 24;

        if (hrs === null || hrs === "" || hrs === undefined) return 0;

        const parsedHrs = Number(hrs);
        if (isNaN(parsedHrs) || parsedHrs < 0) return 0;

        const utilization = parsedHrs / fullDayHours;
        return utilization; // returns 1 for 100%
      }


    getDateDifference(startDate, endDate, cost, frequency) {
      // frequency includes Day, Week, Month
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end - start;
      // const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Round down
      return differenceInDays * (cost ? cost : 1);
    }


    marginFormula(billrate, costrate) {
      // Convert billrate and costrate to numbers
      billrate = Number(billrate);
      costrate = Number(costrate);

      // Check for valid billrate and costrate before proceeding with the calculation
      if (isNaN(billrate) || billrate <= 0) {
        return '0%';
      }

      if (costrate === 0 || isNaN(costrate)) {
        return 'N/A';
      }

      // Calculate margin
      let margin = ((billrate - costrate) / costrate) * 100;

      // Return margin as a rounded percentage string
      return `${(Math.round(margin * 100) / 100).toFixed(2)}%`;
    }

    openDailog() {
      debugger;
      mapboxgl.accessToken = 'pk.eyJ1IjoibWF0c2JyeW50c2UiLCJhIjoiY2tlcHdqd2lrM3hlZjJybHRpeDR0amo1cCJ9.PJc0GY_loGf0iQKlewuL0w';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-73.99209, 40.68933],
        zoom: 8.8
      });
      const geocoder = new MapboxGeocoder();
      geocoder.accessToken = 'pk.eyJ1IjoibWF0c2JyeW50c2UiLCJhIjoiY2tlcHdqd2lrM3hlZjJybHRpeDR0amo1cCJ9.PJc0GY_loGf0iQKlewuL0w';
      geocoder.options = {
        proximity: [-73.99209, 40.68933]
      };
      geocoder.marker = true;
      geocoder.mapboxgl = mapboxgl;
      map.addControl(geocoder);
      map.on('click', (e) => {
        var coordinates = e.lngLat;
        // Call the reverse geocoding API
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            var placeName = data.features[0]?.place_name || "No address found";
            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
          })
          .catch(err => console.error('Error with reverse geocoding:', err));
      });
    }

    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;
          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };
        reader.onerror = function (error) {
          reject(error);
        };
      });
    }
    getDistanceBtwTwoLatitute(lat1, lon1, lat2, lon2) {
      if (lat1 && lon1 && lat2 && lon2) {
        const R = 6371;
        const toRad = (deg) => deg * (Math.PI / 180);
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const radLat1 = toRad(lat1);
        const radLat2 = toRad(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      }
      else {
        return -1;
      }
    }

  }




  return PageModule;

});

