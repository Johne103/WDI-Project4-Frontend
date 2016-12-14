angular.module('finalProject')
  .controller('ProductsIndexController', ProductsIndexController)
  .controller('ProductsOfferedController', ProductsOfferedController)
  .controller('ProductsNewController', ProductsNewController)
  .controller('ProductsShowController', ProductsShowController)
  .controller('ProductsEditController', ProductsEditController);
  // .controller('ProductsPickedIndexController', ProductsPickedIndexController);



ProductsIndexController.$inject = ['Product', '$auth'];
function ProductsIndexController(Product, $auth) {
  const productsIndex = this;

  productsIndex.all = Product.query({ user_id: $auth.getPayload().id });

  function onOffer(product) {
    product.is_available = true;
    product.$update();
  }

  productsIndex.onOffer = onOffer;
}

ProductsOfferedController.$inject = ['Product', '$auth'];
function ProductsOfferedController(Product, $auth) {
  const productsOffered = this;

  productsOffered.all = Product.query({ is_available: true, user_id: $auth.getPayload().id });

  function offOffer(product, $index) {
    product.is_available = false;
    product.$update();

    console.log($index);

    productsOffered.all.splice($index, 1);
  }

  productsOffered.offOffer = offOffer;
}

ProductsNewController.$inject = ['Product', '$state'];
function ProductsNewController(Product, $state) {
  const productsNew = this;

  productsNew.product = {};

  function create() {
    console.log('creating with: ', productsNew.product);

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
