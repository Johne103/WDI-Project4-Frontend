angular.module('finalProject')
 .directive('googleMap', googleMap);
 // .directive('googleplace', googleplace);


googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      markers: '=',
      center: '='
    },
    link: function($scope, element) {
      // let directionsDisplay = null;
      // const directionsService = new $window.google.maps.DirectionsService();
      //
      // directionsDisplay = new $window.google.maps.DirectionsRenderer();
      const map = new $window.google.maps.Map(element[0], {
        center: { lat: $scope.center.latitude, lng: $scope.center.longitude },
        zoom: 14
      });

      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
      }

      const centerMarker = new $window.google.maps.Marker({
        position: { lat: $scope.center.latitude, lng: $scope.center.longitude },
        map: map,
        animation: $window.google.maps.Animation.BOUNCE
      });

      $scope.$watchGroup(['center.latitude', 'center.longitude'], () => {
        const pos = { lat: $scope.center.latitude, lng: $scope.center.longitude };
        map.setCenter(pos);
        centerMarker.setPosition(pos);
      });

      // directionsDisplay.setMap(map);

      // function calcRoute(origin, destination) {
      //   var start = origin;
      //   var end = destination;
      //   var request = {
      //     origin: start,
      //     destination: end,
      //     travelMode: 'DRIVING'
      //   };
      //   directionsService.route(request, function(result, status) {
      //     if (status === 'OK') {
      //       directionsDisplay.setDirections(result);
      //     }
      //   });
      // }

      $scope.$watch('markers', () => {
        clearMarkers();
        $scope.markers.forEach((store) => {
         // Create a marker for each store
          const marker = new $window.google.maps.Marker({
            position: { lat: store.latitude, lng: store.longitude },
            map: map,
            animation: $window.google.maps.Animation.DROP
          });

          markers.push(marker);
        });
      }, true);
    }
  };
}

// googleplace.$inject = ['$window'];
// function googleplace($window) {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     scope: {
//       request: '='
//     },
//     link: function(scope, element, attrs, model) {
//       const options = {
//         types: [],
//         componentRestrictions: {}
//       };
//
//       const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);
//
//       autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();
//         const latLng = place.geometry.location.toJSON();
//         console.log('element', element.attr('id'));
//         const id = element.attr('id');
//         if(id === 'origin-input') {
//           scope.request.location_lat = latLng.lat;
//           scope.request.location_lng = latLng.lng;
//         } else if (id === 'destination-input') {
//           scope.request.destination_lat = latLng.lat;
//           scope.request.destination_lng = latLng.lng;
//         }
//        // scope.request.lat = latLng.lat;
//        // scope.request.lng = latLng.lng;
//         model.$setViewValue(element.val());
//       });
//     }
//   };
// }
