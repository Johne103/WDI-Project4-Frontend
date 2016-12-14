angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersNewController', UsersNewController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController)
  .controller('UserOffersController', UserOffersController);

UsersIndexController.$inject = ['$auth', 'User'];
function UsersIndexController($auth, User) {
  const usersIndex = this;
  const currentUserId = $auth.getPayload().id;

  console.log('UsersIndexController: $auth:', $auth);
  console.log('UsersIndexController: $auth.currentUser:', $auth.currentUser);
  console.log('UsersIndexController: $auth.getPayload():', $auth.getPayload());

  usersIndex.all = [];
  User.query().$promise.then((users) => {
    const currentUser = users.find((user) => {
      return user.id === currentUserId;
    });
    console.log('currentUser:', currentUser);
    usersIndex.all = users.filter((user) => {
      return user.is_store;
    });
    console.log('usersIndex.all:', usersIndex.all);
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

UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;

  usersShow.user = User.get($state.params);

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

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
}
