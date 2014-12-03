var addContent = function(o, e) {
    var string;
    string = o.numChords + ' chords made up of ' + o.numNotes + ' notes with '
        + o.numAccidentals + ' accidentals and ' + o.numGraceNotes + ' grace notes. '
        + 'The highest pitch is ' + o.range.maxPitch + ' and the lowest is ' + o.range.minPitch
        + '. Along with ' + o.numRests + ' rests, this makes up the ' + o.numMeasures + ' measures. '
        + 'The key changes ' + o.keyChanges + ' times and the time signature '
        + 'changes ' + o.timeChanges + ' times.';

    var p1 = document.createTextNode(string);

    e.appendChild(p1);
};

var addPart = function(part) {
    var container = document.getElementById('part_container');
    var newPart = document.createElement('div');
    newPart.setAttribute('class', 'part');

    addContent(part, newPart);

    container.appendChild(newPart);
};

chrome.tabs.getSelected(null, function(tab) {
    var xhr = new XMLHttpRequest(),
        encodedUrl = encodeURIComponent(tab.url);
    xhr.open('GET', 'https://music-api.herokuapp.com/api/get_difficulty_for_musescore_url?url=' + encodedUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var score = JSON.parse(xhr.response);
            var container = document.getElementById('part_container');

            document.getElementById('title').innerText = score.title;

            score.parts.map(addPart);
        }
    };
    xhr.send();
});
