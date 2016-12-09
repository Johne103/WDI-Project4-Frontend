angular.module('finalProject')
  .controller('TagsIndexController', TagsIndexController)
  .controller('TagsNewController', TagsNewController)
  .controller('TagsShowController', TagsShowController)
  .controller('TagsEditController', TagsEditController);

TagsIndexController.$inject = ['Tag'];
function TagsIndexController(Tag) {
  const tagsIndex = this;

  tagsIndex.all = Tag.query();
}

TagsNewController.$inject = ['Tag', '$state'];
function TagsNewController(Tag, $state) {
  const tagsNew = this;

  tagsNew.tag = {};

  function create() {
    Tag.save(tagsNew.tag, () => {
      $state.go('tagsIndex');
    });
  }

  tagsNew.create = create;
}

TagsShowController.$inject = ['Tag', '$state', '$auth'];
function TagsShowController(Tag, $state, $auth) {
  const tagsShow = this;

  tagsShow.tag = Tag.get($state.params);

  function deleteTag() {
    tagsShow.tag.$remove(() => {
      $state.go('tagsIndex');
    });
  }

  tagsShow.delete = deleteTag;
  tagsShow.isLoggedIn = $auth.isAuthenticated;
}

TagsEditController.$inject = ['Tag', '$state'];
function TagsEditController(Tag, $state) {
  const tagsEdit = this;

  tagsEdit.tag = Tag.get($state.params);

  function update() {
    tagsEdit.tag.$update(() => {
      $state.go('tagsShow', $state.params);
    });
  }

  this.update = update;

}
