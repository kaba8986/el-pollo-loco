


function startGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
    console.log('my character is ', world.character)
    document.getElementById('game-screen').classList.remove('d-none');
    document.getElementById('start-screen').classList.add('d-none');
}


function showControls() {
  document.getElementById('control-screen').style.display = 'flex';
  document.querySelector('.ex-main').classList.add('d-none');
  document.getElementById('back').classList.remove('d-none');
}

function goBack() {
  document.getElementById('control-screen').style.display = 'none';
  document.querySelector('.ex-main').classList.remove('d-none');
  document.getElementById('back').classList.add('d-none');
}