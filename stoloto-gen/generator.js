const generateTable = (tableData) => {
  const table = document.createElement('table');
  table.classList.add('table');

  const tbody = document.createElement('tbody');

  for (let j = 0; j < tableData.length; j++) {
    const tr = document.createElement('tr');
    for (let k = 0; k < tableData[j].length; k++) {
      const td = document.createElement('td');
      td.textContent = tableData[j][k];

      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  return table;
}

const generateTickets = () => {
  readTextFile('../data.json', (string) => {
    const data = JSON.parse(string);

    const container = document.querySelector('div.container');

    for (let i = 0; i < data.length; i++) {
      const {firstTableData, secondTableData, editionNumber, ticketNumber, id, packageNumber} = data[i];

      const ticket = document.createElement('div');
      ticket.classList.add('ticket');

      const tables = document.createElement('div');
      tables.classList.add('tables');

      const firstTable = generateTable(firstTableData);
      const secondTable = generateTable(secondTableData);

      const info = document.createElement('div');
      info.classList.add('info');

      const mainText = document.createElement('div');
      mainText.classList.add('text-wrapper');

      mainText.innerHTML = `
        <p class='text'>№ тиража: <span class='text text--large text--bold'>${editionNumber}</span></p>
        <p class='text'>№ билета: <span class='text text--large text--bold'>${ticketNumber}</span></p>
        <p class='text text--small'><span class='text--bold'>${id}</span> № пачки: <span class='text--bold'>${packageNumber}</span></p>
      `;

      const divider = document.createElement('span');
      divider.classList.add('divider');

      const dateText = document.createElement('div');
      dateText.classList.add('text-wrapper');

      dateText.innerHTML = `
        <p class='text text--small'>Розыгрыш тиража — <span class='text--bold'>01.12.2023г.</span></p>
        <p class='text text--small'>В <span class='text--bold'>15:30 (МСК)</span> на НТВ</p>
      `;

      const barcodeWrapper = document.createElement('div');
      barcodeWrapper.classList.add('barcode-wrapper');

      const barcode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      barcode.setAttribute('id', `barcode-${i}`);
      barcode.setAttribute('jsbarcode-format', 'code128');
      barcode.setAttribute('jsbarcode-value', data[i]['ticketNumber']);

      barcodeWrapper.appendChild(barcode);

      info.appendChild(mainText);
      info.appendChild(divider);
      info.appendChild(dateText);
      info.appendChild(barcodeWrapper);

      tables.appendChild(firstTable);
      tables.appendChild(secondTable);

      ticket.appendChild(tables);
      ticket.appendChild(info);

      container.appendChild(ticket);

      JsBarcode(`#barcode-${i}`, ticketNumber, {
        lineColor: 'black',
        width: 2,
        height: 40,
        displayValue: true,
      })
    }
  });
};
