"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function o(){e.signup(r.user).then(function(){t.go("login")})}var r=this;r.user={is_store:!1},r.submit=o}function LoginController(e,t){function o(){e.login(r.credentials).then(function(o){e.currentUser=o.data.user,console.log("LoginController: successResponse:",o),e.currentUser.is_store?t.go("usersShow",{id:e.currentUser.id}):t.go("usersIndex")})}var r=this;r.credentials={},r.submit=o}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map"></div>',scope:{markers:"=",marker:"=",center:"="},link:function(t,o){function r(){n.forEach(function(e){e.setMap(null)}),n=[]}var l=new e.google.maps.Map(o[0],{center:{lat:t.center.latitude,lng:t.center.longitude},zoom:14}),n=[],s=new e.google.maps.Marker({position:{lat:t.center.latitude,lng:t.center.longitude},map:l,animation:e.google.maps.Animation.BOUNCE});n.push(s),t.$watchGroup(["center.latitude","center.longitude"],function(){var e={lat:t.center.latitude,lng:t.center.longitude};l.setCenter(e),s.setPosition(e)}),t.$watch("marker",function(){if(t.marker){console.log(t.marker);var o=new e.google.maps.Marker({position:{lat:t.marker.latitude,lng:t.marker.longitude},map:l,animation:e.google.maps.Animation.DROP});n.push(o),console.log(n);for(var r=new e.google.maps.LatLngBounds,s=0;s<n.length;s++)r.extend(n[s].getPosition());l.fitBounds(r)}},!0),t.$watch("markers",function(){t.markers&&(r(),t.markers.forEach(function(t){var o=new e.google.maps.Marker({position:{lat:t.latitude,lng:t.longitude},map:l,animation:e.google.maps.Animation.DROP});n.push(o)}))},!0)}}}function googlePlace(e){return{restrict:"A",require:"ngModel",scope:{place:"="},link:function(t,o,r,l){var n={types:[],componentRestrictions:{country:"GB"}},s=new e.google.maps.places.Autocomplete(o[0],n);s.addListener("place_changed",function(){var e=s.getPlace(),r=e.geometry.location.toJSON();console.log(e),t.place.lat=r.lat,t.place.lng=r.lng,t.place.google_place_id=e.place_id,t.place.address=e.formatted_address,t.place.phone_number=e.formatted_phone_number,t.place.icon=e.icon,t.place.name=e.name,t.place.rating=e.rating,t.place.website=e.website,l.$setViewValue(o.val())})}}}function MainController(e,t,o,r,l,n){function s(){e.logout().then(function(){t.go("home")})}function a(o,l){u.message=null,e.isAuthenticated()&&(u.currentUser=r.get({id:e.getPayload().id})),!e.isAuthenticated()&&c.includes(l.name)&&(o.preventDefault(),t.go("login"),u.message="You must be logged in to go there!")}function i(e){u.selectedList.push(e),console.log("Basket: ",u.selectedList)}var u=this;u.isLoggedIn=e.isAuthenticated,u.message=null,u.location={latitude:51.51,longitude:-.08},l.navigator.geolocation.getCurrentPosition(function(e){u.location.latitude=e.coords.latitude,u.location.longitude=e.coords.longitude,n.$apply()});var c=["usersEdit","usersNew"];o.$on("$stateChangeStart",a),u.logout=s,u.selectedList=[],u.addToSelectedProducts=i}function Place(e,t){return new e(t+"/places/:id",{id:"@id"},{update:{method:"PUT"}})}function Product(e,t){return new e(t+"/products/:id",{id:"@id"},{update:{method:"PUT"}})}function ProductsIndexController(e,t){function o(e){e.is_available=!0,e.$update()}var r=this;r.all=e.query({user_id:t.getPayload().id}),r.onOffer=o}function ProductsOfferedController(e,t){function o(e,t){e.is_available=!1,e.$update(),console.log(t),r.all.splice(t,1)}var r=this;r.all=e.query({is_available:!0,user_id:t.getPayload().id}),r.offOffer=o}function ProductsNewController(e,t){function o(){console.log("creating with: ",r.product),e.save(r.product,function(){t.go("productsIndex")})}var r=this;r.product={},r.create=o}function ProductsShowController(e,t,o){function r(){l.product.$remove(function(){t.go("productsIndex")})}var l=this;l.product=e.get(t.params),l.delete=r,l.isLoggedIn=o.isAuthenticated}function ProductsEditController(e,t){function o(){r.product.$update(function(){t.go("productsShow",t.params)})}var r=this;r.product=e.get(t.params),r.product.$promise.then(function(e){e.end_time=new Date(e.end_time)}),this.update=o}function Router(e,t){e.state("home",{url:"/",templateUrl:"/templates/home.html",controller:"MainController as home"}).state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("productsOffered",{url:"/products/offered",templateUrl:"/templates/productsOffered.html",controller:"ProductsOfferedController as productsOffered"}).state("userOffers",{url:"/offers",templateUrl:"/templates/userOffers.html",controller:"UserOffersController as userOffers"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("productsIndex",{url:"/products",templateUrl:"/templates/productsIndex.html",controller:"ProductsIndexController as productsIndex"}).state("productsNew",{url:"/products/new",templateUrl:"/templates/productsNew.html",controller:"ProductsNewController as productsNew"}).state("productsShow",{url:"/products/:id",templateUrl:"/templates/productsShow.html",controller:"ProductsShowController as productsShow"}).state("productsEdit",{url:"/products/:id/edit",templateUrl:"/templates/productsEdit.html",controller:"ProductsEditController as productsEdit"}).state("tagsIndex",{url:"/tags",templateUrl:"/templates/tagsIndex.html",controller:"TagsIndexController as tagsIndex"}).state("tagsShow",{url:"/tags/:id",templateUrl:"/templates/tagsShow.html",controller:"TagsShowController as tagsShow"}).state("tagsEdit",{url:"/tags/:id/edit",templateUrl:"/templates/tagsEdit.html",controller:"TagsEditController as tagsEdit"}),t.otherwise("/users")}function Tag(e,t){return new e(t+"/tags/:id",{id:"@id"},{update:{method:"PUT"}})}function TagsIndexController(e){var t=this;t.all=e.query()}function TagsNewController(e,t){function o(){e.save(r.tag,function(){t.go("tagsIndex")})}var r=this;r.tag={},r.create=o}function TagsShowController(e,t,o){function r(){l.tag.$remove(function(){t.go("tagsIndex")})}var l=this;l.tag=e.get(t.params),l.delete=r,l.isLoggedIn=o.isAuthenticated}function TagsEditController(e,t){function o(){r.tag.$update(function(){t.go("tagsShow",t.params)})}var r=this;r.tag=e.get(t.params),this.update=o}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e,t){var o=this;o.all=t.query({is_store:!0})}function UsersNewController(e,t){function o(){e.save(r.user,function(){t.go("usersIndex")})}var r=this;r.user={},r.create=o}function UsersShowController(e,t,o){function r(){l.user.$remove(function(){t.go("usersIndex")})}var l=this;l.user=e.get(t.params),l.delete=r,l.isLoggedIn=o.isAuthenticated}function UsersEditController(e,t){function o(){console.log(r.user),r.user.$update(function(){t.go("usersShow",t.params)})}var r=this;r.user=e.get(t.params),this.update=o}function UserOffersController(e){var t=this;t.all=e.query({is_available:!0})}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","localhost"===window.location.hostname?"http://localhost:3000/api":"//sobuylocal-api.herokuapp.com/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("finalProject").directive("googlePlace",googlePlace),googlePlace.$inject=["$window"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","User","$window","$scope"],angular.module("finalProject").factory("Place",Place),Place.$inject=["$resource","API_URL"],angular.module("finalProject").factory("Product",Product),Product.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ProductsIndexController",ProductsIndexController).controller("ProductsOfferedController",ProductsOfferedController).controller("ProductsNewController",ProductsNewController).controller("ProductsShowController",ProductsShowController).controller("ProductsEditController",ProductsEditController),ProductsIndexController.$inject=["Product","$auth"],ProductsOfferedController.$inject=["Product","$auth"],ProductsNewController.$inject=["Product","$state"],ProductsShowController.$inject=["Product","$state","$auth"],ProductsEditController.$inject=["Product","$state"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("Tag",Tag),Tag.$inject=["$resource","API_URL"],angular.module("finalProject").controller("TagsIndexController",TagsIndexController).controller("TagsNewController",TagsNewController).controller("TagsShowController",TagsShowController).controller("TagsEditController",TagsEditController),TagsIndexController.$inject=["Tag"],TagsNewController.$inject=["Tag","$state"],TagsShowController.$inject=["Tag","$state","$auth"],TagsEditController.$inject=["Tag","$state"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersNewController",UsersNewController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController).controller("UserOffersController",UserOffersController),UsersIndexController.$inject=["$auth","User"],UsersNewController.$inject=["User","$state"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"],UserOffersController.$inject=["Product"];
//# sourceMappingURL=app.js.map
