angular.module('finalProject')
  .directive('googlePlace', googlePlace);

googlePlace.$inject = ['$window'];

function googlePlace($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      place: '='
    },
    link: function($scope, element, attrs, model) {
      const options = {
        types: [],
        componentRestrictions: { country: 'GB' }
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const latLng = place.geometry.location.toJSON();

        console.log(place);

        $scope.place.lat = latLng.lat;
        $scope.place.lng = latLng.lng;
        $scope.place.google_place_id = place.place_id;
        $scope.place.address = place.formatted_address;
        $scope.place.phone_number = place.formatted_phone_number;
        $scope.place.icon = place.icon;
        $scope.place.name = place.name;
        $scope.place.rating = place.rating;
        $scope.place.website = place.website;

        model.$setViewValue(element.val());
      });
    }
  };
}
