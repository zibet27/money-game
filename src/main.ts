import './style.css';
import { Game } from './game';

const width = 50;
const height = 50;
const borderLen = 3;
const blackCoefficient = 0.2;

const field = document.querySelector<HTMLDivElement>('#field')!;
const startButton = document.querySelector<HTMLButtonElement>('#startButton')!;
const stopButton = document.querySelector<HTMLButtonElement>('#stopButton')!;
const coinsCounter = document.querySelector<HTMLHeadingElement>('#coinsCount')!;

const game = new Game(
  field,
  coinsCounter,
  height,
  width,
  borderLen,
  blackCoefficient
);

startButton.onclick = game.start;
stopButton.onclick = game.stop;
