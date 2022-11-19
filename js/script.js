let mutedSounds = false;
let mutedMusic = false;
let mutedEndboss = false;
let paused = false;
intervalIds = [];


function init() {
  location.reload();
}


function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-img').classList.add('d-none');
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('game-buttons').style.display = 'flex';
    document.getElementById('mobile-buttons').style.display = 'flex';
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('end-screen').style.left = '100%';
    // document.getElementById('total-points').classList.remove('d-none');
    // document.getElementById('total-bottles').style.display = 'flex';
    setMobileBtnControl();
}


function showControls() {
  document.getElementById('control-screen').style.display = 'flex';
  document.getElementById('layer').classList.remove('d-none');
}


function hideControls() {
  document.getElementById('control-screen').style.display = 'none';
  if(!paused) {
    document.getElementById('layer').classList.add('d-none');
  }
}



function fullscreen() {
  let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);

  let docElm = document.getElementById('container');
  if (!isInFullScreen) {
    openFullscreen(docElm);
  } else {
    exitFullscreen(docElm);
  }
}


function openFullscreen(docElm) {
  document.getElementById('canvas').classList.add('style-fullscreen');
  if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
  } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
  }
}

function exitFullscreen() {
  document.getElementById('canvas').classList.remove('style-fullscreen');
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
}




function muteSounds() {
  if(mutedSounds) {
    mutedSounds = false;
  } else {
    mutedSounds = true;
  }
  document.getElementById('mute-sounds').classList.toggle('fa-volume-low');
  document.getElementById('mute-sounds').classList.toggle('fa-volume-xmark');
}


function muteMusic() {
  if(mutedMusic) {
    mutedMusic = false;
    mutedEndboss = false;
  } else {
    mutedMusic = true;
    mutedEndboss = true;
  }
  document.getElementById('slash').classList.toggle('d-none');
  document.getElementById('slash').classList.toggle('fa-solid');
  document.getElementById('slash').classList.toggle('fa-slash');
  
}


function pauseGame() {
  if(paused) {
    paused = false;
  } else {
    paused = true;
  }

  document.getElementById('pause-game').classList.toggle('fa-pause');
  document.getElementById('pause-game').classList.toggle('fa-play');
  document.getElementById('layer').classList.toggle('d-none');
  document.getElementById('pause-title').classList.toggle('d-none');
}