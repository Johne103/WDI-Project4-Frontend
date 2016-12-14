angular.module('finalProject')
  .factory('Place', Place);

Place.$inject = ['$resource', 'API_URL'];
function Place($resource, API_URL) {
  return new $resource(`${API_URL}/places/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
