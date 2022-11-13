import fs from 'fs';
import xlsx from 'node-xlsx';
import JSZip from 'jszip';

import moment from 'moment';

// указываем путь до файла с данными
const filename = './raw-data/opd_data_13.11.22.xlsm';

// указываем дату подписания
const dateOfSign = '13.11.2022';

const sheets = xlsx.parse(filename, { cellDates: true, blankrows: false });

const mainSheetData = sheets[0].data;

const phoneFormat = (s, plus = true) => {
  const startsWith = plus ? '+7' : '8';

  let phone = s.replace(/[^0-9]/g, '');
  if (phone.startsWith('7') && plus) {
    phone = phone.substring(1);
  }
  if (phone.startsWith('8')) {
    phone = phone.substring(1);
  }

  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `${ startsWith } ($1) $2-$3-$4`);
};

const personData = mainSheetData
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

fs.readFile('./templates/opd_template.docx', (err, data) => {
  new JSZip()
    .loadAsync(data)
    .then(zip => {
      zip
        .file('word/document.xml')
        .async('string')
        .then(async xmlFile => {
          const cleanXml = cleanXML(xmlFile);

          const output = new JSZip();

          for (const person of personData) {
            let newXml = cleanXml;

            for (const key in person) {
              newXml = newXml.replace(`{${ key }}`, person[key]);
            }

            zip.file('word/document.xml', newXml);

            if (JSZip.support.uint8array) {
              const wordDocument = await zip.generateAsync({ type: 'uint8array' });

              output
                .folder(`Согласия от ${ dateOfSign }`)
                .file(`Согласие ${ person.lastName }.docx`, wordDocument);
            }
          }
          output
            .generateAsync({ type: 'uint8array' })
            .then(content => {
              const folderName = 'output'
              const filename = `Согласия от ${ dateOfSign }.zip`;

              if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
              }

              fs.writeFile(`${folderName}/${filename}`, content, (error) => {
                if (error) console.error(error);
                else console.log('Готово!');
              });
            });
        });
    });
});

const cleanXML = (xmlFile) => {
  //почистить шаблон до правильного вида переменных {fieldName}
  const regExp = /({.*?})/sg;
  const regExpAdditional = /(<.*?>)/g;

  let result = xmlFile.match(regExp) || [];

  result.forEach(element => {
    const newel = element.replace(regExpAdditional, '');
    xmlFile = xmlFile.replace(element, newel);
  });

  return xmlFile;
};
