import React from 'react';
import {
  loadModules
} from 'esri-loader';
import './viewDiv.css'
// fetch('https://opendata.arcgis.com/datasets/fd3677bd8ff44a2cbe6b8cc67a3d2c1c_0.geojson')
// .then((data)=>{console.log(data)}) LOOOK INTO THIS LATER!!!!!!!!!!
let data;
export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {

    // lazy load 
    fetch('https://opendata.arcgis.com/datasets/fd3677bd8ff44a2cbe6b8cc67a3d2c1c_0.geojson')
      .then((respnose) => {
        return respnose.json()
      })
      .then((r) => {
        data = r.features
      })

    loadModules(['esri/WebMap',
        'esri/layers/FeatureLayer',
        'esri/views/MapView',
        'esri/Graphic',

      ], {
        css: true
      })
      .then(([WebMap, FeatureLayer, MapView, Graphic]) => {
        //basemap
        var webMap = new WebMap({
          basemap: "dark-gray-vector"
        });

        // Create MapView
        var view = new MapView({
          container: "viewDiv",
          map: webMap,
          center: [-121.377, 38.600], //fix the center unit
          zoom: 5
        });


        const features = data.map(((item, i) => {
          return new Graphic({
            geometry: {
              type: 'point',
              x: item.geometry['coordinates'][0],
              y: item.geometry['coordinates'][1],
            },
            attributes: {
              ObjectID: i,
              name: item.properties['SCHOOL_NAME'],
              value: item.properties['GRADE_LEVEL'],
              city: item.properties['CITY']
            }
          })
        }))
        console.log(data);
        view.when(() => {

          const fields = [
            // {
            //   name: 'ObjectID',
            //   alias: 'ObjectID',
            //   type: 'oid',
            // },
            {
              name: 'name',
              alias: 'name',
              type: 'string',
            },
            {
              name: 'city',
              alias: 'city',
              type: 'string',
            }
          ];


          const renderer = {
            type: 'simple',
            symbol: {
              type: 'picture-marker',
              width: "40px",
              height: "30px",
              url: "http://static.arcgis.com/images/Symbols/PeoplePlaces/Housing.png"
            },

            outline: {
              width: 11,
              height: 11,
              color: 'blue'
            }
          }
          const layer = new FeatureLayer({
            source: features, // autocast as an array of esri/Graphic
            // create an instance of esri/layers/support/Field for each field object
            fields: fields, // This is required when creating a layer from Graphics
            objectIdField: 'ObjectID', // This must be defined when creating a layer from Graphics
            renderer: renderer
          });
          const pop = {
            title: 'hellllooooooooooooo',
            content: [{
              type: 'fields',
              fieldInfos: [{
                  fieldName: 'name',
                  visible: true,
                  lable: 'noLabel'
                },
                {
                  fieldName: 'city',
                  visible: true,
                  label: 'city'
                }
              ]
            }]
          }
          layer.popupTemplate = pop
          webMap.add(layer);
        });
      });



  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return ( < div className = "webmap"
      ref = {
        this.mapRef
      }
      />
    );
  }
}
