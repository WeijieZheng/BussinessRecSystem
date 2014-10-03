function webGis($scope) {
	$scope.loadingData = function () {
	    require(["dojo/parser", "dojo/ready", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/dom", "esri/map", "esri/geometry/Extent", "esri/urlUtils", "esri/arcgis/utils", "esri/dijit/Legend", "esri/dijit/Scalebar", "dojo/domReady!"], 
        function( parser, ready, BorderContainer, ContentPane, dom, Map, Extent, urlUtils, arcgisUtils, Legend, Scalebar) {
        ready(function(){
        parser.parse();
        var webmap = {};
        webmap.item = {
          "title":"frist map"
        };
        webmap.itemData = {
          "operationalLayers": [{
            "url": "http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer",
            "visibility": true,
            "opacity": 0.75,
            "title": "Soil Survey Map",
            "itemId": "204d94c9b1374de9a21574c9efa31164"
          }],
          "baseMap": {
            "baseMapLayers": [{
              "opacity": 1,
              "visibility": true,
              "url": "http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer"
              },{
              "isReference": true,
              "opacity": 1,
              "visibility": true,
              "url": "http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer"
              }],
            "title": "World_Terrain_Base"
          },
          "version": "1.1"
        };
        dom.byId("title").innerHTML = webmap.item.title;
        dom.byId("subtitle").innerHTML = webmap.item.snippet;
        arcgisUtils.createMap(webmap,"map").then(function(response){
          console.log(response);
          var map = response.map;
          //add the scalebar 
          var scalebar = new Scalebar({
            map: map,
            scalebarUnit: "english"
          });
          //add the legend. Note that we use the utility method getLegendLayers to get 
          //the layers to display in the legend from the createMap response.
          var legendLayers = arcgisUtils.getLegendLayers(response); 
          var legendDijit = new Legend({
            map: map,
            layerInfos: legendLayers
          },"legend");
          legendDijit.startup();
        });
        });
      });
	}
}