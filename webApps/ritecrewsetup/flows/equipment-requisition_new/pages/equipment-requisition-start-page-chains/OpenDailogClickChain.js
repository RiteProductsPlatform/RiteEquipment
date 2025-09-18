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
  mapboxgl,
  mapboxsearch
) => {
  'use strict';

  class OpenDailogClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

        $variables.currindx= index;
        $variables.equpvariable.equipment_id=current.item.data.equipment_id;

      const locationDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#locationDialog',
        method: 'open',
      });
      document.getElementById('loc').innerText="";
      const callFunction = await this.showMap(context);

      
    }

    /**
     * @param {Object} context
     */
    async showMap(context) {
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


           let placeName = "";
            let country = "";
            let postalCode = "";
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
              })
            }

          
            let locality = data.features[0].place_name.split(', '); 
            let address1 = locality.slice(0, 2).join(', ') || locality[0] || "No address line 1";
            let address2 = locality.slice(2).join(', ') || "No address line 2";
            let  district = data.features[0].context[4].text;
            
             $variables.equpvariable.location=locality[0]?locality[0]:'';
             $variables.equpvariable.longitude = coordinates.lng;
             $variables.equpvariable.latitude = coordinates.lat;
             $variables.equpvariable.addressline1 = address1;
             $variables.equpvariable.country = country;
             $variables.equpvariable.addressline2 =   address2;
             $variables.equpvariable.city = placeName;           
             $variables.equpvariable.zipcode=postalCode;
            document.getElementById('loc').innerText=locality;

            console.log('Address:', placeName);
            console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lng}\nAddress: ${placeName}`);
          })
          .catch(err => console.error('Error with reverse geocoding:', err));



      });
    
    }
  }

  return OpenDailogClickChain;
});
