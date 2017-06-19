import circuits from 'circuit-boards';

function byId(id) {
  return document.getElementById(id);
}

function addOnClick(el, fn) {
  el.addEventListener('click', fn, false);
}

class Page {
  constructor() {
    this.regenerateBtn = byId('regenerate');
    this.randomBtn = byId('random');
    this.setAsBackgroundBtn = byId('set-as-background');
    this.values = byId('values');
    this.canvas = document.getElementById('tile');
    this.isBackgroundSet = false;
    this.stopDraw = null;
  }

  setup() {
    addOnClick(this.regenerateBtn, this.onRegenerateClick.bind(this));
    addOnClick(this.randomBtn, this.onRandomClick.bind(this));
    addOnClick(this.setAsBackgroundBtn, this.onSetAsBackgroundClick.bind(this));
    this.generateNewBoard();
  }

  onRegenerateClick() {
    if (this.stopDraw) {
      this.stopDraw(this.generateNewBoard.bind(this));
    } else {
      this.generateNewBoard();
    }
  }

  onRandomClick() {
    const styles = Object.keys(circuits.styles);
    const style = styles[Math.floor(Math.random() * styles.length)];
    this.values.value = JSON.stringify({ style }, null, 4);
    this.onRegenerateClick();
  }

  onSetAsBackgroundClick() {
    this.isBackgroundSet = !this.isBackgroundSet;
    if (this.isBackgroundSet) {
      const img = this.canvas.toDataURL('image/png');
      document.body.className += 'circuit';
      document.body.style.backgroundImage = `url(${img})`;
      let x = 0;
      const move = () => {
        if (!this.isBackgroundSet) { return; }
        x += 2;
        document.body.style.backgroundPositionX = `${x}px`;
        setTimeout(move, 20);
      };
      move();
    } else {
      document.body.className = document.body.className.replace(
        /\bcircuit\b/,
        '',
      );
      document.body.style.backgroundImage = 'none';
    }
  }

  generateNewBoard() {
    const values = JSON.parse(this.values.value);
    this.stopDraw = circuits.draw(this.canvas, values, () => {
      this.stopDraw = null;
    });
  }
}

window.onload = () => {
  new Page().setup();
};
