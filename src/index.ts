import { App } from './system/App';

const container: HTMLElement = document.getElementById('project_container');

const toolButtons = {
  freehand: document.getElementById('freehand-button'),
  shape: document.getElementById('shape-button'),
  fill: document.getElementById('fill-button'),
  erase: document.getElementById('erase-button'),
  move: document.getElementById('move-button'),
  zoom: document.getElementById('zoom-button')
};

const layerButtons = [
  document.getElementById('layer-button-terrain-1'),
  document.getElementById('layer-button-terrain-2'),
  document.getElementById('layer-button-object-1'),
  document.getElementById('layer-button-object-2'),
];

const palleteButtons = [
  document.getElementById('pallete-button-0'),
  document.getElementById('pallete-button-1'),
  document.getElementById('pallete-button-2'),
  document.getElementById('pallete-button-3'),
  document.getElementById('pallete-button-4'),
  document.getElementById('pallete-button-5'),
  document.getElementById('pallete-button-6'),
  document.getElementById('pallete-button-7'),
]

const menuButtons = {
  file: document.getElementById('file-menu-button'),
  edit: document.getElementById('edit-menu-button'),
}

const menuContainer = document.getElementById('menu-container');
const activeSpriteContainer = document.getElementById('active-sprite-container');

new App(container, toolButtons, layerButtons, palleteButtons, menuButtons, menuContainer, activeSpriteContainer);
