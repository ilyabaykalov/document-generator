const printVersionTemplatePath = './templates/print-version/template.html';

const buildPostcardData = () => {
  const postcardForm = this.document.getElementById('postcard-form');

  const formData = new FormData(postcardForm);

  const fullName = formData.get('full-name');
  const title = formData.get('title');
  const text_1 = formData.get('text_1');
  const text_2 = formData.get('text_2');
  const text_3 = formData.get('text_3');
  const text_4 = formData.get('text_4');
  const date = formData.get('date');
  const isWebVersion = formData.get('isWebVersion') === 'on';

  const data = {
    fullName, title,
    text_1, text_2, text_3, text_4,
    date, isWebVersion,
  };

  localStorage.setItem('data', JSON.stringify(data));

  // TODO: добавить ссылку на электронную открытку
  postcardForm.setAttribute('action', printVersionTemplatePath);

  postcardForm.submit();
};

const fillTemplate = () => {
  const data = JSON.parse(localStorage.getItem('data'));

  const {
    fullName, title,
    text_1, text_2, text_3, text_4,
    date,
  } = data;

  const [
    lastName, name, middleName,
    nameInitial = name[0], middleNameInitial = middleName[0],
  ] = fullName.split(' ');

  this.document.title = `Поздравление ${ lastName } ${ nameInitial }.${ middleNameInitial }.`;

  this.document.getElementById('last-name').textContent = lastName;
  this.document.getElementById('name').textContent = `${ name } ${ middleName }`;

  this.document.getElementById('title').textContent = title;

  this.document.getElementById('text_1').textContent = text_1;
  this.document.getElementById('text_2').textContent = text_2;
  this.document.getElementById('text_3').textContent = text_3;
  this.document.getElementById('text_4').textContent = text_4;

  const dateFormatOption = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formattedDate = new Date(date)
    .toLocaleDateString('ru-RU', dateFormatOption)
    .slice(0, -3);

  this.document.getElementById('date').textContent = `г. Москва, ${ formattedDate } года`;
};
