angular
  .module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: 'MainController as home'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('usersProduct', {
      url: '/users/products',
      templateUrl: '/templates/usersProduct.html',
      controller: 'UsersProductController as usersProduct'
    })
    .state('productsIndex', {
      url: '/products',
      templateUrl: '/templates/productsIndex.html',
      controller: 'ProductsIndexController as productsIndex'
    })
    .state('productsPickedIndex', {
      url: '/products',
      templateUrl: '/templates/productsPickedIndex.html',
      controller: 'ProductsPickedIndexController as productsPickedIndex'
    })
    .state('productsNew', {
      url: '/products/New',
      templateUrl: '/templates/productsNew.html',
      controller: 'ProductsNewController as productsNew'
    })
    .state('productsShow', {
      url: '/products/:id',
      templateUrl: '/templates/productsShow.html',
      controller: 'ProductsShowController as productsShow'
    })
    .state('productsEdit', {
      url: '/products/:id/edit',
      templateUrl: '/templates/productsEdit.html',
      controller: 'ProductsEditController as productsEdit'
    })
    .state('tagsIndex', {
      url: '/tags',
      templateUrl: '/templates/tagsIndex.html',
      controller: 'TagsIndexController as tagsIndex'
    })
    .state('tagsShow', {
      url: '/tags/:id',
      templateUrl: '/templates/tagsShow.html',
      controller: 'TagsShowController as tagsShow'
    })
    .state('tagsEdit', {
      url: '/tags/:id/edit',
      templateUrl: '/templates/tagsEdit.html',
      controller: 'TagsEditController as tagsEdit'
    });

  $urlRouterProvider.otherwise('/users');
}
