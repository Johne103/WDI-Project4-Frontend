angular.module('finalProject')
  .factory('Tag', Tag);

Tag.$inject = ['$resource', 'API_URL'];
function Tag($resource, API_URL) {
  return new $resource(`${API_URL}/tags/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
