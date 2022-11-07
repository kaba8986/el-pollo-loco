


function startGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
    console.log('my character is ', world.character)
    document.getElementById('game-screen').classList.remove('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('game-buttons').style.display = 'none';
}


function showControls() {
  document.getElementById('control-screen').style.display = 'flex';
  document.querySelector('.main-buttons').classList.add('d-none');
  document.getElementById('back').classList.remove('d-none');
}

function goBack() {
  document.getElementById('control-screen').style.display = 'none';
  document.querySelector('.main-buttons').classList.remove('d-none');
  document.getElementById('back').classList.add('d-none');
}