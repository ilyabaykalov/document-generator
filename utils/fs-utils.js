import fs from 'fs';

const makeDirIfNotExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

export { makeDirIfNotExist };
