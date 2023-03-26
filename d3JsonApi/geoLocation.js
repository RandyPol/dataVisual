if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    document.getElementById('data').innerHTML =
      'latitude: ' +
      position.coords.latitude +
      '<br>longitude: ' +
      position.coords.longitude
  })
}
