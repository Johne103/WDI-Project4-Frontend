angular.module('finalProject')
  .controller('MainController', MainController)
  ;

MainController.$inject = ['$auth', '$state', '$rootScope', 'User', '$window', '$scope'];
function MainController($auth, $state, $rootScope, User, $window, $scope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('home');
    });
  }

  main.location = { latitude: 51.51, longitude: -0.08 };

  $window.navigator.geolocation.getCurrentPosition((pos) => {
    main.location.latitude = pos.coords.latitude;
    main.location.longitude = pos.coords.longitude;

    $scope.$apply();
  });

  const protectedStates = ['usersEdit', 'usersNew'];

  function secureState(e, toState) {
    main.message = null;

    if($auth.isAuthenticated()) {
      main.currentUser = User.get({ id: $auth.getPayload().id });
    }

    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;

  main.selectedList = [];
  // user selected prod list
  function addToSelectedProducts(product) {
    main.selectedList.push(product);
    console.log('Basket: ', main.selectedList);
  }
  main.addToSelectedProducts = addToSelectedProducts;

}
