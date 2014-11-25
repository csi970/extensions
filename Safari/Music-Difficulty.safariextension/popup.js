var activeTab = safari.application.activeBrowserWindow.activeTab;
var xhr = new XMLHttpRequest(),
    encodedUrl = encodeURIComponent(activeTab.url);
xhr.open('GET', 'https://music-api.herokuapp.com/api/get_difficulty_for_musescore_url?url=' + encodedUrl, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        document.getElementById("resp").innerText = xhr.responseText;
    }
};
xhr.send();
