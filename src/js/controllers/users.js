angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersNewController', UsersNewController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController)
  .controller('UserOffersController', UserOffersController);

UsersIndexController.$inject = ['$auth', 'User', '$window', '$scope'];
function UsersIndexController($auth, User, $window, $scope) {
  const usersIndex = this;

  usersIndex.all = User.query({ is_store: true });

  usersIndex.location = { latitude: 51.51, longitude: -0.08 };

  $window.navigator.geolocation.getCurrentPosition((pos) => {
    usersIndex.location.latitude = pos.coords.latitude;
    usersIndex.location.longitude = pos.coords.longitude;

    $scope.$apply();
  });
}

UsersNewController.$inject = ['User', '$state'];
function UsersNewController(User, $state) {
  const usersNew = this;

  usersNew.user = {};

  function create() {
    User.save(usersNew.user, () => {
      $state.go('usersIndex');
    });
  }

  usersNew.create = create;
}

UsersShowController.$inject = ['User', '$state', '$auth', '$scope', '$window', '$http'];
function UsersShowController(User, $state, $auth, $scope, $window, $http) {
  const usersShow = this;

  usersShow.user = User.get($state.params);

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  usersShow.location = { latitude: 51.51, longitude: -0.08 };

  $window.navigator.geolocation.getCurrentPosition((pos) => {
    usersShow.location.latitude = pos.coords.latitude;
    usersShow.location.longitude = pos.coords.longitude;

    $scope.$apply();
  });


  usersShow.delete = deleteUser;
  usersShow.isLoggedIn = $auth.isAuthenticated;
}

UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);
  function update() {
    console.log(usersEdit.user);
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }

  this.update = update;

}

UserOffersController.$inject = ['Product'];
function UserOffersController(Product) {
  const userOffers = this;

  userOffers.all = Product.query({ is_available: true });
  // userOffers.all = Product.query({ category: 'Bread' });
}
