var addContent = function(o, e, i) {
    var proto = document.getElementById('prototype');
    var newEl = proto.cloneNode(true);

    e.appendChild(newEl);
  
    var score = (o.difficulty * 100).toFixed(0);
    var score_class = 'easy';
    if (score > 50) {
        score_class = 'medium';
    }
    if (score > 100) {
        score_class = 'hard';
    }
    
    newEl.setAttribute('class', 'part ' + score_class);
    newEl.removeAttribute('id');
    
    newEl.querySelector('.partName').setAttribute('for', 'part-'+i);
    newEl.querySelector('.partNameCheck').setAttribute('id', 'part-'+i);
    
    newEl.querySelector('.score').textContent = (o.difficulty * 100).toFixed(0);
    newEl.querySelector('.numNotes').textContent = o.numNotes;
    newEl.querySelector('.numChords').textContent = o.numChords;
    newEl.querySelector('.numAccidentals').textContent = o.numAccidentals;
    newEl.querySelector('.numGraceNotes').textContent = o.numGraceNotes;
    newEl.querySelector('.numRests').textContent = o.numRests;
    newEl.querySelector('.keyChanges').textContent = o.keyChanges;
    newEl.querySelector('.timeChanges').textContent = o.timeChanges;
    newEl.querySelector('.partName').textContent = o.partName || o.partId;
    var rangeString = o.range.minPitch + '-' + o.range.maxPitch;
    newEl.querySelector('.range').textContent = rangeString;
};

var addPart = function(part, index) {
    var container = document.getElementById('part_container');

    addContent(part, container, index);
};

self.port.on('show', function (url) {

  var partContainer = document.getElementById('part_container');
  var subPartElements = Array.prototype.slice.call(partContainer.querySelectorAll('.part'));
  subPartElements.forEach(function (el) {
      partContainer.removeChild(el);
  });

  // alert('yo');
  var xhr = new XMLHttpRequest(),
      encodedUrl = encodeURIComponent(url);
  xhr.open('GET', 'https://music-api.herokuapp.com/api/get_difficulty_for_musescore_url?url=' + encodedUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var score = JSON.parse(xhr.response);

      document.getElementById('title').textContent = score.title;

      score.parts.map(addPart);
    }
  };
  xhr.send();
});
