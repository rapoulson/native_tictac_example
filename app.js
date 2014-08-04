(function() {
  function appStart() {
    alert("Application started!");
  }

  function genericError() {
    console.error('Something went wrong');
  }

  TT.native.init()
    .done(appStart)
    .fail(genericError);
})();