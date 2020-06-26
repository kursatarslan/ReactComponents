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
            Office: item["Office"],
            address: item["Address"],
          },
        });
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8,
        highlightOptions: {
          color:'#00bef5',
          fillOpacity: 200
        }
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
            name: "Office",
            alias: "Office",
            type: "string",
          },
          {
            name: "Address",
            alias: "Address",
            type: "string",
          },
          {
            name: "phone",
            alias: "Phone",
            type: "string",
          },
          {
            name: "fax",
            alias: "Fax",
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
          title: "<h2>{Office}</h2>",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "Office",
                  visible: true,
                  lable: "Office",
                },
                {
                  fieldName: "Address",
                  visible: true,
                  label: "address",
                },
              ],
            },
          ],
        };
        layer.popupTemplate = pop;
        // this is a popup functionality and customization, not to be confused with the popup object itself
        view.popup = {
          dockEnabled: true,
          dockOptions: {
            // Disables the dock button from the popup
            buttonEnabled: false,
            // Ignore the default sizes that trigger responsive docking
            breakpoint: true
          }
        };
        map.add(layer);
        const panel = {
          popupTemplate: {
            content: ""
          }
        };
        const panelLayer = new Feature({
          container: "panel",
          graphic: panel,
          map: view.map,
          
        });
        let highlight;
        // var container = document.getElementById("panel");
        // // container.innerHTML = data.map((item)=>{
          // //   return `<h3>${item.name}</h3> 
          // //               <P>${item.address}</P>`
          // // })
          // container.innerHTML = "";
          let container = document.getElementById('panel');
          
          data.forEach((item)=>{
          
          let innerContainer = document.createElement('div');
          innerContainer.className += 'buttonlink'
          innerContainer.setAttribute('id',item.id)
          
          let officeName = document.createElement('h3')
          officeName.classname += 'title'
          let address = document.createElement('p')
          officeName.innerHTML =  '';
          address.innerHTML = '';
          officeName.className += ''
          innerContainer.appendChild(officeName);
          innerContainer.appendChild(address)
          container.appendChild(innerContainer)
          // container.appendChild(officeName);
          // container.appendChild(address)
          innerContainer.addEventListener('click',(event)=>{
            if(highlight) highlight.remove()
            
            
            let index =Number( event.path[1].attributes[1].nodeValue);
            let longitude = item.longitude
            let latitude = item.latitude
           
            view
            .goTo({
               center: [longitude, latitude]
              })
              
              view.whenLayerView(layer).then(function(layerView) {
                
                highlight = layerView.highlight(item.id-1);
              });
            })
          })        
          view.ui.add(panelLayer, 'top-right')
          
          
        });
        return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  },[]);

  return( 
  <div>
    {/* <div className = "panel-side esri-widget "> */}
    <div className = "panel" id = "panel"></div>
  <div className="webmap" ref={mapRef} />
    </div>

  );
}
