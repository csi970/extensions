self.port.on('show', function (url) {
  var xhr = new XMLHttpRequest(),
      encodedUrl = encodeURIComponent(url);
  xhr.open('GET', 'https://music-api.herokuapp.com/api/get_difficulty_for_musescore_url?url=' + encodedUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var responseDiv = document.getElementById("response");
      responseDiv.textContent = xhr.responseText;
    }
  };
  xhr.send();
});
