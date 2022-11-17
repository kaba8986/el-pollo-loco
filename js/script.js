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
    document.getElementById('total-points').classList.remove('d-none');
    document.getElementById('total-bottles').style.display = 'flex';
    containerWidth();
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


function openFullscreen() {
  let display = document.getElementById('container');
  if(display.classList.contains('fullscreen')) {
    closeFullscreen();
  } else {
    display.classList.add('fullscreen');
    if (display.requestFullscreen) {
      display.requestFullscreen();
    } else if (display.mozRequestFullScreen) {
      // Firefox
      display.mozRequestFullScreen();
    } else if (display.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      display.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      // IE/Edge
      display.msRequestFullscreen();
    } else if (canvas.webkitEnterFullScreen) {
      display.webkitEnterFullScreen();
    }
  }
}

function closeFullscreen() {
  let display = document.getElementById('container');
  display.classList.remove('fullscreen');
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}


function containerWidth() {
    window.addEventListener('resize', () => {
      let containerWidth = document.getElementById('container').offsetWidth;
      document.getElementById('canvas').style.width = containerWidth;
      console.log(containerWidth);
    })
}
/*
function containerWidth() {
  let canvasWidth = document.getElementById('canvas').offsetWidth;
  document.getElementById('container').style.width = canvasWidth;
  console.log(canvasWidth);
}
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


