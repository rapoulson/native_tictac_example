(function() {
  function appStart() {
    TT.api.get('v1/me').done(fetchStoreProducts, addClickHandlers).fail(genericError);
  }

  function share() {
    TT.native.showShareDialog(
      'You\'re awesome!',
      'Hey, I just built my first app on Tictail!'
    );
  }

  function addClickHandlers(store) {
    $('.share-button').on('click', share);
  }

  function genericError() {
    console.error('Something went wrong');
  }

  function fetchStoreProducts(store) {
  TT.api.get('v1/stores/' + store.id + '/products')
    .done(listProductImages)
    .fail(genericError);
  }

  function listProductImages(products) {
  var imageContainer = $('.images');

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    $('<img>')
      .attr('src', product.images[0].sizes['100'])
      .appendTo(imageContainer);
    }
  }

  TT.native.init()
    .done(appStart)
    .fail(genericError);
})();