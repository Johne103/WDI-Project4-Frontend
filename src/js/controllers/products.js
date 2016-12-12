angular.module('finalProject')
  .controller('ProductsIndexController', ProductsIndexController)
  .controller('ProductsNewController', ProductsNewController)
  .controller('ProductsShowController', ProductsShowController)
  .controller('ProductsEditController', ProductsEditController);
  // .controller('ProductsPickedIndexController', ProductsPickedIndexController);



ProductsIndexController.$inject = ['Product'];
function ProductsIndexController(Product) {
  const productIndex = this;

  productIndex.all = Product.query();
}

ProductsNewController.$inject = ['Product', '$state'];
function ProductsNewController(Product, $state) {
  const productsShowsNew = this;

  productsShowsNew.productsShow = {};

  function create() {
    Product.save(productsShowsNew.productsShow, () => {
      $state.go('productIndex');
    });
  }

  productsShowsNew.create = create;
}

ProductsShowController.$inject = ['Product', '$state', '$auth'];
function ProductsShowController(Product, $state, $auth) {
  const productsShow = this;

  productsShow.product = Product.get($state.params);

  function deleteProduct() {
    productsShow.product.$remove(() => {
      $state.go('productIndex');
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
    productsEdit.product.$update(() => {
      $state.go('productsShow', $state.params);
    });
  }

  this.update = update;

}

// ProductsPickedIndexController.$inject = ['Product', '$auth', 'User'];
// function ProductsPickedIndexController(Product, $auth, User) {
//   const productsPickedIndex = this;
//   productsPickedIndex.productPicks = [];
//   // console.log($auth.getPayload());
//   User.get({id: $auth.getPayload()._id}, (user) => {
//     productsPickedIndex.user = user;
//   });
// }
