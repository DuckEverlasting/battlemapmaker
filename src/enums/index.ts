export const LAYER = {
  "BG": 0,
  "TERRAIN_1": 1,
  "TERRAIN_2": 2,
  "OBJECT_1": 3,
  "OBJECT_2": 4,
  "EFFECT_TILEMAP": 5,
  "EFFECT_ALL": 6,
  "CURSOR": 7
}

export const SPRITE_TYPE = {
  "TERRAIN": 0,
  "OBJECT": 1,
  "EFFECT": 2,
  "CURSOR": 3,
  "OTHER": 4
}

export const LAYER_TYPE: {[key: number]: number, [key: string]: number} = {
  0: 4,
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3
}