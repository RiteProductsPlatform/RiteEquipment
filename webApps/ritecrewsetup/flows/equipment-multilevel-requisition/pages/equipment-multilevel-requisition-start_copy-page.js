define(["knockout", "ojs/ojknockout", "ojs/ojarraydataprovider", 'mapbox-gl', 'mapboxsearch'], (ko, ArrayDataProvider, mapboxgl, mapboxsearch) => {
  'use strict';

  class PageModule {
    cartAddition(current, myarray) {
      let array = JSON.parse(myarray);
      const exists = array.some(item => item.equipment_id === current.equipment_id);
      if (!exists) {
        array.push(current);
      }

      return array;
    }
    getDateDifference(startDate, endDate, cost, frequency, equip_req_quantity) {
      // frequency includes Day, Week, Month
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end - start;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Round down

      const baseCost = differenceInDays * (cost ? cost : 1);
      return baseCost * (equip_req_quantity ? Number(equip_req_quantity) : 1);
    }


    removefromCart(current, myarray) {
      let array = JSON.parse(myarray);
      let finalarray = [];
      for (let i = 0; i < array.length; i++) {
        if (current.equipment_id !== array[i].equipment_id) {
          finalarray.push(array[i]);
        }
      }
      return finalarray;
    }
    marginFormula(mybillrate, mycostrate) {
      // Convert billrate and costrate to numbers
      let billrate = Number(mybillrate);
      let costrate = Number(mycostrate);

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
        let coordinates = e.lngLat;
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


    cartPayloadgenerator(reqnumber, row, current, array, p_equipment_cart_number, startdate, endDate, user) {
      // "business_unit_id": 300001690071768,
      //         "business_unit_name": "MMX India Business Unit"
      let obj1 = {
        "inventory_item": row.inventory_item,
        "inventory_item_id": row.inventory_item_id,
        "business_unit_id": row.bu_id,
        "business_unit_name": row.bu_name,
        "addressline1": row.addressline1,
        "addressline2": row.addressline2,
        "city": row.city,
        "country": row.country,
        "crew_id": row.crew_id.toString(),
        "crew_name": row.crew_name,
        "efforts_per_day": row.efforts_per_day.toString(),
        "end_date": endDate,
        "eqp_request_number": reqnumber,
        "equip_req_quantity": current.equip_req_quantity.toString(),
        "equipment_class": current.equipment_class,
        // "equipment_id": current.equipment_id,
        "equipment_id": null,
        "equipment_name": current.equipment_name,
        // "equipment_number": current.equipment_number,
        "equipment_number": null,
        "equipment_type": current.equipment_type,
        "latitude": row.longitude.toString(),
        "location": row.location,
        "longitude": row.latitude.toString(),
        "non_labor_resource": current.non_labor_resource,
        "non_labor_resource_org": current.non_labor_resource_org,
        "project_id": row.project_id ? row.project_id.toString() : null,
        "project_name": row.project_name,
        "project_number": row.project_number,
        "rate_basis": row.rate_basis,
        "request_type": row.request_type,
        "requestor_name": user,
        "created_by": user,
        "start_date": startdate,
        "task_id": row.task_id ? row.task_id.toString() : null,
        "task_name": row.task_name,
        "task_number": row.task_number,
        "utilization": row.utilization.toString(),
        "zipcode": row.zipcode
      };
      return obj1;
    }

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month and pad with '0'
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }

    getUniqueEquipments(data) {
      if (data) {
        let eqpName = [];
        let uniqItems = [];
        data.forEach((itm) => {
          if (eqpName.length === 0) {
            uniqItems.push(itm);
            itm.totQuantity = itm.onhand_availability;
            eqpName.push(itm.equipment_name);

          }
          else if (eqpName.indexOf(itm.equipment_name) === -1) {
            itm.totQuantity = itm.onhand_availability;
            uniqItems.push(itm);
            eqpName.push(itm.equipment_name);
          }

        });
        return uniqItems;
      }

    }


  };




  return PageModule;
});
