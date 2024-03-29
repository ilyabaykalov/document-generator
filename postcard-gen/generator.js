const validatorState = {
  'full_name': false,
  'title': false
}

const buildPostcardData = (event) => {
  const postcardForm = this.document.getElementById('postcard-form');

  const formData = new FormData(postcardForm);

  const data = {};

  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }

  if (validatorState['full_name'] && validatorState['title']) {
    localStorage.setItem('data', JSON.stringify(data));

    const year = this.document.getElementById('year').value

    postcardForm.setAttribute('action', `./templates/${year}/${data.isWebVersion ? 'web' : 'print'}-version/template.html`);

    postcardForm.submit();
  } else {
    alert('Проверьте правильность введенных значений');

    event.preventDefault();
  }
};

const validateFullName = ({target}) => {
  const { value } = target;

  const regExp = /^[А-Я][а-я]+\s[А-Я][а-я]+\s[А-Я][а-я]+$/;
  const isValid = regExp.test(value);

  if (!isValid)
    this.document.getElementById('full_name-error').setAttribute('style', 'display: block');
  else
    this.document.getElementById('full_name-error').setAttribute('style', 'display: none');

  validatorState['full_name'] = isValid;
}

const validateTitle = ({target}) => {
  const { value } = target;

  const regExp = /^Уважаем(ый|ая)\s[А-Я][а-я]+\s[А-Я][а-я]+!$/;
  const isValid = regExp.test(value);

  if (!isValid)
    this.document.getElementById('title-error').setAttribute('style', 'display: block');
  else
    this.document.getElementById('title-error').setAttribute('style', 'display: none');

  validatorState['title'] = isValid;
}

const fillTemplate = () => {
  const data = JSON.parse(localStorage.getItem('data'));

  const { full_name, date } = data;

  const [lastName, name, middleName] = full_name.split(' ');
  const initials = `${ lastName } ${ name[0] }.${ middleName[0] }.`

  this.document.title = `Поздравление ${ initials }`;

  const nameElement = this.document.getElementById('name');
  const lastNameElement = this.document.getElementById('last-name');

  if (nameElement && lastNameElement) {
    nameElement.textContent = `${ name } ${ middleName }`;
    lastNameElement.textContent = lastName;
  }

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

const onDownload = (filename) => {
  const printForm = document.querySelector('.page');

  html2canvas(printForm, {
    windowWidth: printForm.offsetWidth,
    windowHeight: printForm.offsetHeight,
    useCORS: true,
    allowTaint: true,
    scale: 4,
    x: 0, y: 0
  }).then((canvas) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpg');
    link.download = `${filename}png`;

    link.click();
  });
}

const loadData = (templateName) => {
  const year = this.document.getElementById('year').value;

  const templates = {
    'birthday': {
      '2023': {
        full_name: '',
        title: 'Уважаем',
        text_1: "Примите мои самые искренние поздравления с Днём Рождения!",
        text_2: "От всей души желаю Вам крепкого здоровья, плодотворной работы, успехов и реализации всех планов! Пусть всегда рядом будет всесторонняя поддержка родных и близких, коллег и друзей, а накопленный жизненный опыт и оптимизм помогают Вам уверенно идти вперед!",
        text_3: "Желаю уважения и признания в Вашей сфере деятельности, благополучия и удачи.",
        text_4: "Пусть каждый день дарит новые силы, возможности и большие перспективы.\nБлагодарю Вас за ответственный подход к своей работе, высокий профессионализм и нацеленность на достижение результата по всем вопросам!",
        date: new Date().toISOString().split('T')[0]
      },
      '2024': {
        full_name: '',
        title: 'Уважаем',
        text_1: "Сердечно поздравляю Вас с Днём Рождения! Знаю Вас, как энергичного человека, идущего по жизни смело и с оптимизмом!",
        text_2: "Уверена, что Ваши знания и накопленный опыт позволят Вам  успешно претворять в жизнь все задуманное, обеспечат путь к реализации поставленных целей и покорению новых профессиональных высот.",
        text_3: "Ваши преданность и силы, вложенные в работу, несомненно, способствуют развитию нашего региона. Пусть Ваша работа продолжает и дальше приносить пользу жителям Московской области.",
        text_4: "Желаю Вам крепкого здоровья, удачи, счастья, мира, новых возможностей, радости и успеха в Вашей профессиональной и личной жизни.",
        date: new Date().toISOString().split('T')[0]
      },
      '2025': {
        full_name: '',
        title: 'Уважаем',
        text_1: "",
        text_2: "",
        text_3: "",
        text_4: "",
        date: new Date().toISOString().split('T')[0]
      },
    }
  };

  const data = templateName
      ? templates[templateName][year]
      : JSON.parse(localStorage.getItem('data'));

  toggleErrorMessage(!templateName);

  for (const key in data) {
    this.document.getElementById(key).value = data[key] || '';
  }
}

const toggleErrorMessage = (isValid) => {
  validatorState['full_name'] = isValid;
  validatorState['title'] = isValid;

  this.document.getElementById('full_name-error').setAttribute('style', `display: ${isValid ? 'none' : 'block'}`);
  this.document.getElementById('title-error').setAttribute('style', `display: ${isValid ? 'none' : 'block'}`);

}

const resetForm = () => {
  const keys = ['full_name', 'title', 'text_1', 'text_2', 'text_3', 'text_4', 'date'];

  toggleErrorMessage(false);

  keys.forEach(key => this.document.getElementById(key).value = '');
}

