import { join, resolve } from 'path';
import fs from 'fs';

import { makeDirIfNotExist } from '../utils/fs-utils.js';

const __dirname = resolve();

const rawFolder = join(__dirname, 'raw');

makeDirIfNotExist(rawFolder);

const renameFilesByRangeFromFolderName = () => {
  const folders = fs
    .readdirSync(rawFolder, { withFileTypes: true })
    .filter(object => object.isDirectory())
    .map(folder => folder.name);

  folders.forEach(folder => {
    const [startIndex, endIndex] = folder.split('-');

    const currentFolder = join(rawFolder, folder);

    fs.readdir(currentFolder, (err, files) => {
      if (files.length > 0) {
        files.sort(compareFilenames);

        for (let index = startIndex; index <= endIndex; index++) {
          const [filename, ext] = files[index - startIndex].split('.');

          renameFile(currentFolder, filename, ext, index);
        }
      }
    });

    fs.rm(currentFolder, { recursive: true }, ()=> console.log(`Папка ${folder} удалена!`));
  });
};

const compareFilenames = (a, b) => {
  const regExp = /\d{1,3}-\d{1,3}.*-(\d{1,2}).pdf/gi;

  const filenameA = Number(a.replace(regExp, '$1'));
  const filenameB = Number(b.replace(regExp, '$1'));

  return filenameA - filenameB;
};

const renameFile = (currentFolder, filename, ext, index) => {
  const inputPath = join(currentFolder, `${ filename }.${ ext }`);
  const outputFolder = join(__dirname, 'output');

  makeDirIfNotExist(outputFolder);

  const outputFilename = `20.000${ index }.${ ext }`;
  const outputPath = join(outputFolder, outputFilename);

  fs.rename(inputPath, outputPath, (err) => {
    if (err) throw err;
  });

  console.log('Готово!');
};

renameFilesByRangeFromFolderName();
