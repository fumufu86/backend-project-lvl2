import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (diff, stile) => {
  switch (stile) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};

export default format;
