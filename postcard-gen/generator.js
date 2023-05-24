const onLoadGenerator = () => {
  if (confirm('Загрузить последние данные?')) {
    const data = JSON.parse(localStorage.getItem('data'));

    for (const key in data) {
      this.document.getElementById(key).value = data[key] || '';
    }
  }
};

const buildPostcardData = () => {
  const postcardForm = this.document.getElementById('postcard-form');

  const formData = new FormData(postcardForm);

  const data = {};

  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }

  localStorage.setItem('data', JSON.stringify(data));

  postcardForm.setAttribute('action', `./templates/${data.isWebVersion ? 'web' : 'print'}-version/template.html`);

  postcardForm.submit();
};

const fillTemplate = () => {
  const data = JSON.parse(localStorage.getItem('data'));

  const { full_name, date, isWebVersion } = data;

  const [lastName, name, middleName] = full_name.split(' ');
  const initials = `${ lastName } ${ name[0] }.${ middleName[0] }.`

  this.document.title = `Поздравление ${ initials }`;

  this.document.getElementById('last-name').textContent = lastName;
  this.document.getElementById('name').textContent = `${ name } ${ middleName }`;

  for (const key in data) {
    if (['full_name', 'date', 'isWebVersion'].includes(key)) continue;

    this.document.getElementById(key).textContent = data[key];
  }

  const formattedDate = new Date(date)
    .toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
    .slice(0, -3);

  this.document.getElementById('date').textContent = `г. Москва, ${ formattedDate } года`;

  setTimeout(onDownload.bind(null, isWebVersion), 300);
};

const onDownload = (isWebVersion) => {
  const printForm = document.querySelector('body');

  const options = {
    filename: 'postcard.pdf',
    image: { type: 'png' },
    html2canvas: {
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true,
      x: 0, y: 0
    },
    jsPDF: {
      orientation: isWebVersion ? 'landscape' : 'portrait',
    }
  };

  html2pdf()
      .set(options)
      .from(printForm)
      .toPdf()
      .get('pdf')
      .then(pdf => {
        window.open(pdf.output('bloburl'), '_blank');
      });
}
