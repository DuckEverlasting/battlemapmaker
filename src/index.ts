import { App } from './system/App';
import "./index.css";

new App({
  displayContainer: document.getElementById('display-container'),
  toolBox: document.getElementById('tool-box'),
  layerButtonBox: document.getElementById('layer-button-box'),
  pallete: document.getElementById('pallete'),
  menuContainer: document.getElementById('menu-container'),
  menuBarContainer: document.getElementById('top-bar'),
  activeSpriteContainer: document.getElementById('active-sprite-container')
});
