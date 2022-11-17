import { parse } from 'node-xlsx';
import JSZip from 'jszip';

import moment from 'moment';

import { join, resolve } from 'path';
import fs from 'fs';

const __dirname = resolve();

// путь до файла-шаблона
const templateFilename = join(__dirname, 'template', 'opd_template.docx');

// указываем путь до файла с данными
const filename = join(__dirname, 'raw', 'opd_data_13.11.22.xlsm');

// указываем дату подписания
const dateOfSign = '13.11.2022';

/**
 * Форматирование телефонного номера
 *
 * @param {string} number неформатированный номер телефона
 * @param {boolean} [plus=true] начинать телефон с '+7' или с '8'
 * */
const phoneFormat = (number, plus = true) => {
  const startsWith = plus ? '+7' : '8';

  let phone = number.replace(/[^0-9]/g, '');
  if (phone.startsWith('7') && plus) {
    phone = phone.substring(1);
  }
  if (phone.startsWith('8')) {
    phone = phone.substring(1);
  }

  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `${ startsWith } ($1) $2-$3-$4`);
};

/**
 * Очистка файла word/document.xml от лишних символов
 *
 * @param {string} xml xml-файл шаблона, полученный из документа (*.docx)
 * */
const cleanXML = (xml) => {
  const regExp = /({.*?})/sg;
  const regExpAdditional = /(<.*?>)/g;

  let result = xml.match(regExp) || [];

  result.forEach(element => {
    const newel = element.replace(regExpAdditional, '');
    xml = xml.replace(element, newel);
  });

  return xml;
};

/**
 * Парсинг Excel-документа
 *
 * @return {array} Массив данных пользователей
 * */
const parseExcelDocument = () => {
  const sheets = parse(filename, { cellDates: true, blankrows: false });

  const mainSheetData = sheets[0].data;

  return mainSheetData
    .slice(1) // убираем заголовок таблицы
    .map(person => ({
      lastName: person[4],
      name: person[5],
      middleName: person[6],
      birthday: moment
        .utc(person[7])
        .utcOffset(200)
        .format('DD.MM.yyyy'),
      address: person[8],
      phoneNumber: phoneFormat(person[10].toString()),
      lastNameWithInitials: `${ person[4] } ${ person[5][0] }.${ person[6][0] }.`,
      dateOfSign,
    }));
};

/**
 * Генерация Word-документа
 *
 * @param {string} xml xml-файл шаблона, полученный из документа (*.docx)
 * @param {object} personData персональные данные
 * @param {JSZip} wordDocument открытый документ шаблона
 * */
const generateOPDDocument = async (xml, personData, wordDocument) => {
  for (const key in personData) {
    xml = xml.replace(`{${ key }}`, personData[key]);
  }

  wordDocument.file('word/document.xml', xml);

  return await wordDocument.generateAsync({ type: 'uint8array' });
};

/**
 * Сохранение сгенерированных документов в архив
 *
 * @param {JSZip} output архив, содержащий сохраненные документы
 * */
const saveDocumentsIntoArchive = (output) => {
  output
    .generateAsync({ type: 'uint8array' })
    .then(content => {
      const folderName = join(__dirname, 'output');
      const filename = `Согласия от ${ dateOfSign }.zip`;

      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }

      fs.writeFile(`${ folderName }/${ filename }`, content, (error) => {
        if (error) console.error(error);
        else console.log('Готово!');
      });
    });
};

/**
 * Запуск генератора
 * */
const process = () => {
  fs.readFile(templateFilename, (err, data) => {
    new JSZip()
      .loadAsync(data)
      .then(wordDocument => {
        wordDocument
          .file('word/document.xml')
          .async('string')
          .then(async xml => {
            const output = new JSZip();

            xml = cleanXML(xml);

            for (const personData of parseExcelDocument()) {
              const document = await generateOPDDocument(xml, personData, wordDocument);

              output
                .folder(`Согласия от ${ dateOfSign }`)
                .file(`Согласие ${ personData.lastName }.docx`, document);
            }

            saveDocumentsIntoArchive(output);
          });
      });
  });
};

process();
