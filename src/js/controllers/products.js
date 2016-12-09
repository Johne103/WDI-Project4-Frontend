angular.module('finalProject')
  .controller('ProductsIndexController', ProductsIndexController)
  .controller('ProductsNewController', ProductsNewController)
  .controller('ProductsShowController', ProductsShowController)
  .controller('ProductsEditController', ProductsEditController);

ProductsIndexController.$inject = ['Product'];
function ProductsIndexController(Product) {
  const productsShowsIndex = this;

  productsShowsIndex.all = Product.query();
}

ProductsNewController.$inject = ['Product', '$state'];
function ProductsNewController(Product, $state) {
  const productsShowsNew = this;

  productsShowsNew.productsShow = {};

  function create() {
    Product.save(productsShowsNew.productsShow, () => {
      $state.go('productsShowsIndex');
    });
  }

  productsShowsNew.create = create;
}

ProductsShowController.$inject = ['Product', '$state', '$auth'];
function ProductsShowController(Product, $state, $auth) {
  const productsShow = this;

  productsShow.productsShow = Product.get($state.params);

  function deleteProduct() {
    productsShow.productsShow.$remove(() => {
      $state.go('productsShowsIndex');
    });
  }

  productsShow.delete = deleteProduct;
  productsShow.isLoggedIn = $auth.isAuthenticated;
}

ProductsEditController.$inject = ['Product', '$state'];
function ProductsEditController(Product, $state) {
  const usersEdit = this;

  usersEdit.user = Product.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }

  this.update = update;

}
