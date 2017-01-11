angular.module('finalProject')
 .directive('googleMap', googleMap);



googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      markers: '=',
      marker: '=',
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
        icon: 'images/grayMarker.png',
        animation: $window.google.maps.Animation.BOUNCE
      });

      markers.push(centerMarker);

      $scope.$watchGroup(['center.latitude', 'center.longitude'], () => {
        const pos = { lat: $scope.center.latitude, lng: $scope.center.longitude };
        centerMarker.setPosition(pos);
      });

      // directionsDisplay.setMap(map);

      // function calcRoute(origin, destination) {
      //   var center.latitude,center.longitude = origin;
      //   var store.latitude,store.longitude = destination;
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

      // function computeDistanceBetween(origin) {

      // const origin=center.latitude,center.longitude|store.latitude,store.longitude






      // }
      // origins=41.43206,-81.38992|-33.86748,151.20699
      // computeDistanceBetween(from:LatLng, to:LatLng, radius?:number)


      $scope.$watch('marker', () => {
        if ($scope.marker) {
          const pos = { lat: $scope.marker.latitude, lng: $scope.marker.longitude };
          // clearMarkers();
          const storeMarker = new $window.google.maps.Marker({
            position: pos,
            map: map,
            animation: $window.google.maps.Animation.DROP
          });

          map.setCenter(pos);

          markers.push(storeMarker);
          // const bounds = new $window.google.maps.LatLngBounds();
          // for (var i = 0; i < markers.length; i++) {
          //   bounds.extend(markers[i].getPosition());
          // }
          // map.fitBounds(bounds);
        }
      }, true);

      $scope.$watch('markers', () => {
        if ($scope.markers) {
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
        }
      }, true);
    }
  };
}
