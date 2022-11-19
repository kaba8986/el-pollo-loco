//Global Variables
let mutedSounds = false;
let mutedMusic = false;
let mutedEndboss = false;
let paused = false;
intervalIds = [];


/**
 * Reloads Page
 */
function init() {
  location.reload();
}


/**
 * Creates Intervals and push them in an array
 * @param {function} fn 
 * @param {number} time 
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


/**
 * Starts the game - adding and removing displays
 */
function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-img').classList.add('d-none');
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('game-buttons').style.display = 'flex';
    document.getElementById('mobile-buttons').style.display = 'flex';
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('end-screen').style.left = '100%';
    setMobileBtnControl();
}


/**
 * Shows Controls by click
 */
function showControls() {
  document.getElementById('control-screen').style.display = 'flex';
  document.getElementById('layer').classList.remove('d-none');
}


/**
 * Hides Controls by click
 */
function hideControls() {
  document.getElementById('control-screen').style.display = 'none';
  if(!paused) {
    document.getElementById('layer').classList.add('d-none');
  }
}


function showStory() {
  document.getElementById('story-screen').style.display = 'flex';
  document.getElementById('layer').classList.remove('d-none');
}


function hideStory() {
  document.getElementById('story-screen').style.display = 'none';
  document.getElementById('layer').classList.add('d-none');
}


/**
 * Toggle Fullscreen, executing openFullscreen and exitFullscreen
 */
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


/**
 * Open Fullscreen Mode
 * @param {string} docElm 
 */
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


/**
 * Exit Fullscreen Mode
 */
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



/**
 * Sets Variable, if mute sound is clicked and changes icon
 */
function muteSounds() {
  if(mutedSounds) {
    mutedSounds = false;
  } else {
    mutedSounds = true;
  }
  document.getElementById('mute-sounds').classList.toggle('fa-volume-low');
  document.getElementById('mute-sounds').classList.toggle('fa-volume-xmark');
}


/**
 * Sets Variable, if mute music is clicked and changes icon
 */
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


/**
 * Sets Variable, if pause is clicked and changes icon
 */
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