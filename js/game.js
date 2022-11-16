let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];




function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}



window.addEventListener('keydown', (event) => {
  if(event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if(event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if(event.keyCode == 38) {
    keyboard.UP = true;
  }
  if(event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if(event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if(event.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (event) => {
  if(event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if(event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if(event.keyCode == 38) {
    keyboard.UP = false;
  }
  if(event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if(event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if(event.keyCode == 68) {
    keyboard.D = false;
  }


});

/*MOBILE CONTROL*/

function setMobileBtnControl() {

  document.getElementById('canvas').addEventListener('touchstart', (e) => {
    e.preventDefault();
  });

  document.getElementById('mobile-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('mobile-left').addEventListener('touchend', (e) => {
    keyboard.LEFT = false;
  });

  document.getElementById('mobile-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

    document.getElementById('mobile-right').addEventListener('touchend', (e) => {
    keyboard.RIGHT = false;
  });

  document.getElementById('mobile-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById('mobile-jump').addEventListener('touchend', (e) => {
    keyboard.SPACE = false;
  });

  document.getElementById('mobile-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById('mobile-throw').addEventListener('touchend', (e) => {
    keyboard.D = false;
  });

}

