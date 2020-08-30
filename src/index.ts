import { App } from './system/App';

const container: HTMLElement = document.getElementById('project_container');

const toolButtons = {
  freehand: document.getElementById('freehand-button'),
  shape: document.getElementById('shape-button'),
  fill: document.getElementById('fill-button'),
  erase: document.getElementById('erase-button'),
};

const layerButtons = [
  document.getElementById('layer-button-1'),
  document.getElementById('layer-button-2'),
  document.getElementById('layer-button-3'),
];

const activeSpriteContainer = document.getElementById('active_sprite_container');

new App(container, toolButtons, layerButtons, activeSpriteContainer);
