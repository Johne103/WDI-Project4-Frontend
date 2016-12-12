angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersNewController', UsersNewController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController)
  .controller('UsersProductController', UsersProductController);


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

UsersProductController.$inject = ['User', '$state', 'Product', '$scope', '$auth'];
function UsersProductController(User, $state, Product, $scope, $auth) {
  const usersProduct = this;
  usersProduct.all = [];

  usersProduct.user = User.get({ id: $auth.getPayload()._id });
  usersProduct.isPick = isPick;
  usersProduct.toggle = toggle;


  function isPick(product) {
    return usersProduct.user.productPicks.includes(product.id);
  }

  function toggle(product) {
    if(isPick(product)) {
      const idx = usersProduct.user.productPicks.findIndex((productId) => {
        productId === product.id;
      });
      usersProduct.user.productPicks.splice(idx, 1);
    } else {
      usersProduct.user.productPicks.push(product.id);
    }
  }

  function update() {
    usersProduct.user.$update(() => {
      $state.go('productsIndex', $state.params);
    });
  }

  usersProduct.update = update;
}
