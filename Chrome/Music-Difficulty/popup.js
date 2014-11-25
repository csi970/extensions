chrome.tabs.getSelected(null, function(tab) {
    var xhr = new XMLHttpRequest(),
        encodedUrl = encodeURIComponent(tab.url);
    xhr.open('GET', 'https://music-api.herokuapp.com/api/get_difficulty_for_musescore_url?url=' + encodedUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            document.getElementById("resp").innerText = xhr.responseText;
        }
    };
    xhr.send();
});
