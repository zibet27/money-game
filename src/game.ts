import { getClassName, getUniqueCoin } from './utils';

const COINS = 'Coins: ';

export class Game {
  maxSize = 0;
  interval = 0;
  coinsCount = 0;
  isStarted = false;
  coins = new Set<string>();
  elements: HTMLDivElement[][] = [];

  constructor(
    readonly field: HTMLDivElement,
    readonly coinsCounter: HTMLHeadingElement,
    readonly height: number,
    readonly width: number,
    readonly borderLen: number,
    readonly blackCoefficient: number
  ) {
    this.maxSize = this.width * this.height;
    this.initField();
  }

  start = () => {
    if (this.isStarted) return;
    this.isStarted = true;
    this.interval = setInterval(this.createCoin, 1000);
  };

  stop = () => {
    if (!this.isStarted) return;
    this.setCoinsCount(0);
    this.isStarted = false;
    clearInterval(this.interval);
    for (const coinId of this.coins) {
      const [h, w] = coinId.split(' ');
      const el = this.elements[+h][+w];
      this.removeCoin(el, coinId);
    }
  };

  initField = () => {
    for (let i = 0; i < this.width; i++) {
      const parent = document.createElement('div');
      parent.className = 'row';
      this.elements[i] = [];
      for (let j = 0; j < this.height; j++) {
        const item = document.createElement('div');
        item.className = getClassName(i, j, this.blackCoefficient, {
          min: this.borderLen,
          max: this.width - this.borderLen - 1,
        });
        parent.appendChild(item);
        this.elements[i].push(item);
      }
      this.field.appendChild(parent);
    }
  };

  createCoin = () => {
    if (this.coins.size === this.maxSize) {
      return;
    }
    const [height, width, id] = getUniqueCoin(this.coins, {
      min: this.borderLen + 1,
      max: this.width - this.borderLen - 1,
    });
    const el = this.elements[height][width];
    el.className += ' coin';
    el.textContent = '$';
    this.coins.add(id);
    el.onclick = () => {
      this.removeCoin(el, id);
      this.setCoinsCount(this.coinsCount + 1);
    };
  };

  removeCoin = (el: HTMLDivElement, id: string) => {
    this.coins.delete(id);
    el.textContent = null;
    el.className = el.className.replace(' coin', '');
  };

  setCoinsCount = (count: number) => {
    this.coinsCount = count;
    this.coinsCounter.textContent = COINS + count;
  };
}
