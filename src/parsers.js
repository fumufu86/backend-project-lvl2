import yaml from 'js-yaml';

const parseFile = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case ('yml' || 'yaml'):
      return yaml.load(data);
    default:
      throw new Error(`Формат не поддерживается: ${format}`);
  }
};

export default parseFile;
