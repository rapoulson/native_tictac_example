(function() {
  function appStart() {
    if (/feed=true/.test(window.location.search)) {
      $('#app').addClass('hidden');
      $('#feed').removeClass('hidden');
    }

    TT.api.get('v1/me').done(fetchStoreProducts, addClickHandlers).fail(genericError);
  }

  function share() {
    TT.native.showShareDialog(
      'You\'re awesome!',
      'Hey, I just built my first app on Tictail!'
    );
  }

  function feedCardCreated() {
    TT.native.showStatus('Created');
  }

  function addFeedCard(e) {
    TT.api.post('v1/stores/' + e.data.store.id + '/cards', {
      title: 'My First Native Feed Card',
      card_type: 'native',
      content: {
        url: 'http://localhost:4000?feed=true'
      }
    }).done(feedCardCreated).fail(genericError);
  }

  function addClickHandlers(store) {
    $('.share-button').on('click', share);
    $('.feed-button').on('click', { store: store }, addFeedCard);
    $('.perform-button').click(function() { TT.native.performCard(); });
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
    
  TT.native.reportSize();
})();