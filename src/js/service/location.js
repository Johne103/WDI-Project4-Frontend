angular.module('finalProject')
  .service('locationService', locationService);

locationService.$inject = ['$window'];
function locationService($window) {
  const locationService = this;
  locationService.location = { latitude: 51.51, longitude: -0.08 };

  $window.navigator.geolocation.getCurrentPosition((pos) => {
    locationService.location.latitude = pos.coords.latitude;
    locationService.location.longitude = pos.coords.longitude;
  });

  return locationService;
}
