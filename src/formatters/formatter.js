import stylish from './stylish.js';

const format = (diff, stile) => {
  switch (stile) {
    case 'stylish':
      return stylish(diff);
    default:
      return stylish(diff);
  }
};

export default format;
