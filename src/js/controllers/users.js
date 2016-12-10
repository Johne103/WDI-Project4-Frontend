angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersNewController', UsersNewController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
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
