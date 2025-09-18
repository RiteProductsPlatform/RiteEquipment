define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
  'mapbox-gl',
  'mapboxsearch'
], (
  ActionChain,
  Actions,
  ActionUtils,
  mapboxgl, mapboxsearch
) => {
  'use strict';

  class TextAreaValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.Distaince',
        ],
      });

      const ojDialog12393698203Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog--1239369820-3',
        method: 'open',
      });

      await this.opemapdialog(context);
    }


    /**
     * @param {Object} context
     */

    async opemapdialog(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

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


           var placeName = "";
            var country = "";
            var postalCode = "";
            var city="";
            var address1=""; var address2="";
            var isaddorplace = false;
            if (data.features) {
              data.features.forEach((itm) => {
                if (itm.id.includes('postcode')) {
                  postalCode = itm.text;
                }
                 if (itm.id.includes('region')) {
                  placeName = itm.text;
                }
                 if (itm.id.includes('country')) {
                  country = itm.text;
                }
                 if (itm.id.includes('place')) {
                  city = itm.text;
                  address2 = itm.place_name;
                }
                  if (itm.id.includes('locality')) {
                  address1 = itm.place_name;
                }
                  if (itm.id.includes('address')) {
                  isaddorplace = true;
                } 
              })
            }

        if(isaddorplace){
            var locality = data.features[0].place_name.split(', ');
             address1 = locality.slice(0, 2).join(', ') || locality[0] || "No address line 1";
             address2 = locality.slice(2).join(', ') || "No address line 2";
            var district = data.features[0].context[4].text
          }
            $variables.selectedRowRequest.zipcode = postalCode;
            $variables.selectedRowRequest.location = placeName;
           // $variables.selectedRowRequest.location = $variables.selectedRow.location;
            $variables.selectedRowRequest.longitude = coordinates.lng;
            $variables.selectedRowRequest.latitude = coordinates.lat;
            $variables.selectedRowRequest.addressline1 = address1;
            $variables.selectedRowRequest.country = country;
            $variables.selectedRowRequest.addressline2 = address2;
            $variables.selectedRowRequest.city = placeName;  

            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
            if (coordinates.lat && coordinates.lng) {

              if ($variables.CartArray) {
                let epudistance=[];
                $variables.CartArray.forEach((itm) => {
                  const getDistance = $page.functions.getDistanceBtwTwoLatitute(itm.latitude,itm.longitude,coordinates.lat, coordinates.lng);
                  epudistance.push({
                    "Equipment":itm.equipment_name,
                    "Distaince":`${getDistance.toFixed(2)} km  ${(getDistance * 0.621371).toFixed(2)} miles `
                  });
                  if (getDistance == -1) {
                    $variables.Distaince = "Selected Equipment Does Not Have Latitude And Longitude";
                  }
                  else {
                    $variables.Distaince = `Distance : ${getDistance.toFixed(2)} km  ${(getDistance * 0.621371).toFixed(2)} miles `;
                  }
                });
                
                 $variables.equipdistainceADP.data=epudistance;
              }







            }

          })
          .catch(err => console.error('Error with reverse geocoding:', err));



      });




    }

  }

  return TextAreaValueChangeChain;
});
