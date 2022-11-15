let muted = false;


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-img').classList.add('d-none');
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('game-buttons').style.display = 'flex';
    document.getElementById('mobile-buttons').style.display = 'flex';
    document.getElementById('canvas').classList.remove('d-none');
    setMobileBtnControl();
}


function showControls() {
  document.getElementById('control-screen').style.display = 'flex';
  document.getElementById('layer').classList.remove('d-none');
}


function hideControls() {
  document.getElementById('control-screen').style.display = 'none';
  document.getElementById('layer').classList.add('d-none');
}


function toggleFullscreen() {
  let canvas = document.getElementById('canvas');
  if(canvas.requestFullScreen)
      canvas.requestFullScreen();
  else if(canvas.webkitRequestFullScreen)
      canvas.webkitRequestFullScreen();
  else if(canvas.mozRequestFullScreen)
      canvas.mozRequestFullScreen();
}


function mutePage() {
  if(muted) {
    muted = false;
  } else {
    muted = true;
  }
  document.getElementById('mute-btn').classList.toggle('fa-volume-off');
  document.getElementById('mute-btn').classList.toggle('fa-volume-xmark');
}


