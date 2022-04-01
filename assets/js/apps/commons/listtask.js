var div = document.getElementById("dom-target");
//someText = someText.replace(/(\r\n|\n|\r)/gm, "");
var armado = div.textContent;
//var armado = armado.replace(/(\r\n|\n|\r)/gm, "");
$(document).ready(function() {
     mapbox = sessionStorage.getItem('mapbox');

    mapboxgl.accessToken = mapbox;
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-99.053, 19.44], // starting position
        zoom: 9 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    console.log(armado)


    /*
        var geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-99.053, 19.4122]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'Washington, D.C.'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-99.053, 18.44]
                    },
                    properties: {
                        title: 'Mapbox',
                        description: 'San Francisco, California'
                    }
                }
            ]
        };*/

    var geojson = {};

    var type = 'FeatureCollection'

    var features = []

    geojson.type = type;
    geojson.features = features
    var typef = 'Feature'
        /*
        var geometry = {
            "type": 'Point',
            "coordinates": [-99.053, 19.4122]
        }
        var properties = {
            "title": 'Mapbox',
            "description": 'Washington, D.C.'
        }

        var feature = {
            "type": typef,
            "geometry": geometry,
            "properties": properties
        }*/

    //geojson.features.push(feature)

    var arrpos = armado.split('|')
        //var coordenadas = []

    for (var i = 0; i < arrpos.length - 1; i++) {

        detalle = arrpos[i].split('ˆ')
        coordenadas = [detalle[2], detalle[1]]
        titulo = 'Actividad:' + detalle[3]
        describe = 'Direccion:' + detalle[0]
        console.log(coordenadas + " / ");
        geometry = {
            "type": 'Point',
            "coordinates": coordenadas
        }

        properties = {
            "title": titulo,
            "description": describe
        }

        feature = {
            "type": typef,
            "geometry": geometry,
            "properties": properties
        }

        geojson.features.push(feature)

    }


    // add markers to map
    geojson.features.forEach(function(marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            .addTo(map);
    });

});