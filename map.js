
    // Initialize map
    var map = L.map('map').setView([51.464147, -0.243602], 15);
    
    // Load and display green spaces
fetch('TQ_GreenspaceSite.json')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: 'green',
        fillColor: 'lightgreen',
        weight: 1,
        fillOpacity: 0.2
      }
    }).addTo(map);
  });

  const markerGroups = {}; // To store LayerGroups by key

// Icons
const homeIcon = L.icon({
  iconUrl: 'Icons/home.png',
  iconSize: [30, 35],
});
const sheepIcon = L.icon({
  iconUrl: 'Icons/sheepIcon.png',
  iconSize: [40, 40],
});
const gardenIcon = L.icon({
  iconUrl: 'Icons/flower.png',
  iconSize: [40, 40],
});
const woodsIcon = L.icon({
  iconUrl: 'Icons/trees.png',
  iconSize: [40, 40],
});
const parkIcon = L.icon({
  iconUrl: 'Icons/park.png',
  iconSize: [40, 40],
});
const fieldIcon = L.icon({
  iconUrl: 'Icons/field.png',
  iconSize: [40, 40],
});
const vegIcon = L.icon({
  iconUrl: 'Icons/veg.png',
  iconSize: [40, 40],
});
const museumIcon = L.icon({
  iconUrl: 'Icons/museum.png',
  iconSize: [40, 40],
});
const artIcon = L.icon({
  iconUrl: 'Icons/art.png',
  iconSize: [40, 40],
});

// Add home marker
L.marker([51.464147, -0.243602], { icon: homeIcon }).addTo(map);

// Sheet endpoints with matching icons and keys
const endpoints = [
  {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/london/farm',
    icon: sheepIcon,
    key: 'farm',
  },
  {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/london/communityGarden',
    icon: gardenIcon,
    key: 'communityGarden',
  },
    {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/london/fields',
    icon: fieldIcon,
    key: 'fields',
  },
    {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/london/woods',
    icon: woodsIcon,
    key: 'woods',
  },
    {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/london/parks',
    icon: parkIcon,
    key: 'parks',
  },
      {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/london/allotment',
    icon: vegIcon,
    key: 'allotment',
  },
      {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/museums/museum',
    icon: museumIcon,
    key: 'museum',
  },
      {
    url: 'https://api.sheety.co/6f525da9f6465f222a5039485e0d5c27/museums/artAndDesign',
    icon: artIcon,
    key: 'artAndDesign',
  }

];

// Fetch all sheets
endpoints.forEach(({ url, icon, key }) => {
  fetch(url)
    .then(res => res.json())
    .then(json => {
      const places = json[key];
     // console.log(key, places);

      places.forEach(place => {
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lng);

        if (!isNaN(lat) && !isNaN(lng)) {

if (!markerGroups[key]) {
  markerGroups[key] = L.layerGroup(); // Don't call .addTo(map) here
}

    const marker = L.marker([lat, lng], { icon })
    .bindPopup(`<strong>${place.name}</strong>`);
    marker.addTo(markerGroups[key]); // <--- this is crucial!
      }
      });
    })

    .catch(err => console.error(`Error loading ${key}:`, err));
});

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('#controls input[type=checkbox]').forEach(input => {
    input.addEventListener('change', () => {
      const key = input.dataset.layer;
      const layer = markerGroups[key];

      if (layer) {
        if (input.checked) {
          layer.addTo(map);
        } else {
          map.removeLayer(layer);
        }
      } 
    });
  });
});


