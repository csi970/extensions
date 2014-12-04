var addContent = function(o, e, i) {
    var proto = document.getElementById('prototype');
    var newEl = proto.cloneNode(true);

    e.appendChild(newEl);
  
    //TODO: change class name for different difficulties
    //TODO: get part name from API and display ("Part #") if none is provided
    var score = (o.difficulty * 100).toFixed(0);
    
    newEl.setAttribute('class', 'part easy');
    newEl.removeAttribute('id');
    
    newEl.querySelector('.partName').setAttribute('for', 'part-'+i);
    newEl.querySelector('.partNameCheck').setAttribute('id', 'part-'+i);
    
    newEl.querySelector('.score').innerText = (o.difficulty * 100).toFixed(0);
    newEl.querySelector('.numNotes').innerText = o.numNotes;
    newEl.querySelector('.numChords').innerText = o.numChords;
    newEl.querySelector('.numAccidentals').innerText = o.numAccidentals;
    newEl.querySelector('.numGraceNotes').innerText = o.numGraceNotes;
    newEl.querySelector('.numRests').innerText = o.numRests;
    newEl.querySelector('.keyChanges').innerText = o.keyChanges;
    newEl.querySelector('.timeChanges').innerText = o.timeChanges;
    var rangeString = o.range.minPitch + '-' + o.range.maxPitch;
    newEl.querySelector('.range').innerText = rangeString;
};

var addPart = function(part, index) {
    var container = document.getElementById('part_container');

    addContent(part, container, index);
};

chrome.tabs.getSelected(null, function(tab) {
    var xhr = new XMLHttpRequest(),
        encodedUrl = encodeURIComponent(tab.url);
    xhr.open('GET', 'https://music-api.herokuapp.com/api/get_difficulty_for_musescore_url?url=' + encodedUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var score = JSON.parse(xhr.response);

            document.getElementById('title').innerText = score.title;

            score.parts.map(addPart);
            
            var pro = document.getElementById('prototype');
            document.getElementById('part_container').removeChild(pro);
        }
    };
    xhr.send();
});
