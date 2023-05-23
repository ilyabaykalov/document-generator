// window.jsPDF = window.jspdf.jsPDF;

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

  const { full_name, date } = data;

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

  setTimeout(onDownload.bind(null, initials), 300);
};

const onDownload = (initials) => {
  const printForm = document.querySelector(".page");

  const options = {
    filename: `${initials}.pdf`,
    image: { type: 'png' },
    html2canvas: {
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true, x: 0
    },
    jsPDF: {
      orientation: 'landscape',
    }
  };

  const pdf = html2pdf()
      .set(options)
      .from(printForm);

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    const blob = pdf.output();
    // window.open(URL.createObjectURL(new Blob([blob])));
    window.open(pdf.output("bloburl"), "_blank");
  } else {
    pdf.save();
  }
}

// const onDownload = () => {
//   const printForm = document.querySelector(".page");
//
//   const printFormWidth = printForm.innerWidth;
//   const a4Format = [595.28, 841.89];
//
//   // printForm
//   //     .set('width', ((a4Format[0] * 1.33333) - 80).toString())
//   //     .width((a4Format[0] * 1.33333) - 80)
//   //     .css('max-width', 'none')
//   //     .css('width', (a4Format[0] * 1.33333) - 80);
//
//   html2canvas(printForm, {
//     // useCORS: true,
//     // imageTimeout: 10000,
//     allowTaint: true,
//     foreignObjectRendering: true,
//     // removeContainer: true,
//     // width: printFormWidth,
//     // windowWidth: printFormWidth,
//     scrollX: -window.scrollX,
//     scrollY: -window.scrollY,
//     windowWidth: document.documentElement.offsetWidth,
//     windowHeight: document.documentElement.offsetHeight
//   }).then((canvas) => {
//     const img = canvas.toDataURL('image/png', 1.0);
//     const doc = new jsPDF({
//       // unit: 'mm',
//       format: 'a4',
//       orientation: 'landscape',
//     });
//
//     doc.addImage(img, 'png', 20, 20);
//     doc.save('test.pdf');
//     // printForm.width(printFormWidth);
//   });
// }
