import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, stile) => {
  switch (stile) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      return stylish(diff);
  }
};

export default format;
