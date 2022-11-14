


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-img').classList.add('d-none');
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('game-buttons').style.display = 'flex';
    document.getElementById('canvas').classList.remove('d-none');
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