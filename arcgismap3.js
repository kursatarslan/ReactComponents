import React, { useState, useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import "./map.css";

export default function WebMapView() {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Search",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/widgets/Feature"
      ],
      {
        css: true,
      }
    ).then(([ArcGISMap, MapView, Search, FeatureLayer, graphic, Feature]) => {
      const map = new ArcGISMap({
        basemap: "topo-vector",
        ground: "world-elevation",
      });

      // adding feature and using data( which is a global variable outside of this funciton)
      const features = data.map((item, i) => {
        return new graphic({
          geometry: {
            type: "point",
            x: item.longitude,
            y: item.latitude,
          },
          attributes: {
            ObjectID: i,
            name: item["name"],
            address: item["address"],
          },
        });
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8,
    
      });

      const searchWidget = new Search({
        view: view,
      });
      // Adds the search widget below other elements in
      // the top left corner of the view
      view.ui.add(searchWidget, {
        position: "top-left",
        index: 0,
      });
      // adding the shit
      view.when(() => {
        const fields = [
          // {
          //   name: 'ObjectID',
          //   alias: 'ObjectID',
          //   type: 'oid',
          // },
          {
            name: "name",
            alias: "name",
            type: "string",
          },
          {
            name: "address",
            alias: "address",
            type: "string",
          },
          {
            name: "phone",
            alias: "phone",
            type: "string",
          },
          {
            name: "fax",
            alias: "fax",
            type: "string",
          },
        ];

        const renderer = {
          type: "simple",
          symbol: {
            type: "simple-marker",
            color: "#046B99",
            size: 6,
          },

          outline: {
            width: 11,
            height: 11,
            color: "blue",
          },
        };
        const layer = new FeatureLayer({
          source: features, // autocast as an array of esri/Graphic
          // create an instance of esri/layers/support/Field for each field object
          fields: fields, // This is required when creating a layer from Graphics
          objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
          renderer: renderer,
        });
        const pop = {
          title: "Data",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "name",
                  visible: true,
                  lable: "noLabel",
                },
                {
                  fieldName: "address",
                  visible: true,
                  label: "address",
                },
              ],
            },
          ],
        };
        layer.popupTemplate = pop;
        map.add(layer);
        const panel = {
          popupTemplate: {
            content: "Office List"
          }
        };
        const panelLayer = new Feature({
          container: "panel",
          graphic: panel,
          map: view.map,
         
        });
        // var container = document.getElementById("panel");
        // // container.innerHTML = data.map((item)=>{
        // //   return `<h3>${item.name}</h3> 
        // //               <P>${item.address}</P>`
        // // })
        // container.innerHTML = "";
        let container = document.getElementById('panel');
        data.forEach((item)=>{

          let innerContainer = document.createElement('div');
          innerContainer.className += "buttonlink"
          
          
          let officeName = document.createElement('h4')
          officeName.classname += 'title'
          let address = document.createElement('p')
          officeName.innerHTML =  ;
          address.innerHTML =  ;
          officeName.className += ''
          innerContainer.appendChild(officeName);
          innerContainer.appendChild(address)
          container.appendChild(innerContainer)
          // container.appendChild();
          // container.appendChild()
            innerContainer.addEventListener('click',(event)=>{
           

            let index =Number( event.path[1].attributes[1].nodeValue);
             let longitude = item.longitude
            let latitude = item.latitude
             view.goTo({
               center: [longitude, latitude]
            })
        })        


      });
      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return( 
  <div>
    <div className = "panel-side esri-widget ">
    <div className = "panel" id = "panel"></div>
    </div>
  <div className="webmap" ref={mapRef} />
  </div>
  );
}
