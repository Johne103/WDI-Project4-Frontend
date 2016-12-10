angular.module('finalProject')
  .controller('ProductsIndexController', ProductsIndexController)
  .controller('ProductsNewController', ProductsNewController)
  .controller('ProductsShowController', ProductsShowController)
  .controller('ProductsEditController', ProductsEditController);

ProductsIndexController.$inject = ['Product'];
function ProductsIndexController(Product) {
  const productsIndex = this;

  productsIndex.all = Product.query();
}

ProductsNewController.$inject = ['Product', '$state'];
function ProductsNewController(Product, $state) {
  const productsNew = this;

  productsNew.product = {};

  function create() {
    Product.save(productsNew.product, () => {
      $state.go('productsIndex');
    });
  }

  productsNew.create = create;
}

ProductsShowController.$inject = ['Product', '$state', '$auth'];
function ProductsShowController(Product, $state, $auth) {
  const productsShow = this;

  productsShow.product = Product.get($state.params);

  function deleteProduct() {
    productsShow.product.$remove(() => {
      $state.go('productsIndex');
    });
  }

  productsShow.delete = deleteProduct;
  productsShow.isLoggedIn = $auth.isAuthenticated;
}

ProductsEditController.$inject = ['Product', '$state'];
function ProductsEditController(Product, $state) {
  const productsEdit = this;

  productsEdit.product = Product.get($state.params);
  function update() {
    console.log(productsEdit.product);
    productsEdit.product.$update(() => {
      $state.go('productsShow', $state.params);
    });
  }

  this.update = update;

}
