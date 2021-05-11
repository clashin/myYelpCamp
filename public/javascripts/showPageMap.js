mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10  // starting zoom
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 20 })
            .setHTML(
                `<h4>${campground.title}</h4><p>${campground.location}</p>`
            )
    )
    .addTo(map);
