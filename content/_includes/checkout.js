const eventSelect = document.getElementById('field-product');
const countInput = document.getElementById('field-count');
const maxInput = document.getElementById('max');

const priceInput = document.getElementById('field-price');
const priceTotal = document.getElementById('total-price-output');
const availableOut = document.getElementById('tickets-available-output');
const summaryOut = document.getElementById('final-purchase-output');

const getEvent = () => {
  const val = eventSelect.value.split('@event@');
  return val[1];
}

const getTicketInfo = (event) => {
  return tickets.find((ticket) => ticket.event === event);
}

const getOnSale = (event) => {
  const data = getTicketInfo(event);
  return data.onSale;
}

const updateOutput = () => {
  updateTotal();

  const event = getEvent();

  updateLimit(event);
  updateSummary(event);
}

const updateSummary = (event) => {
  const count = countInput.value || 0;
  const eventInfo = getTicketInfo(event);
  const display = typeof eventInfo.display == 'string'
    ? eventInfo.display
    : eventInfo.display.value;

  summaryOut.innerHTML = `
    <strong>${count}</strong>
    ${count === 1 ? 'ticket' : 'tickets'} for
    <strong>${display}</strong>
  `;
}

const updateTotal = () => {
  if (priceInput.value && countInput.value) {
    const total = Number(priceInput.value * countInput.value).toFixed(2);
    priceTotal.value = `$${total}`;
  } else {
    priceTotal.value = 'n/a';
  }
}

const updateLimit = (event) => {
  const max = getOnSale(event);

  countInput.setAttribute('max', max);
  maxInput.setAttribute('value', max);
  availableOut.value = max > 0
    ? max
    : 'SOLD OUT';
}

const updateTicketData = (data) => {
  tickets.forEach((ticket, index) => {
    const newData = data.find((item) => ticket.event === item.event);
    if (newData) { tickets[index] = {...ticket, ...newData}; }
  });
}

const getTicketData = async () => {
  const response = await fetch(
    '/api/tickets/?' + new URLSearchParams({ show })
  );
  const data = await response.json();
  return data.data;
}

const refreshData = async () => {
  const info = await getTicketData();
  updateTicketData(info);
  updateOutput();
}

window.onload = async () => {
  countInput.addEventListener('change', () => updateOutput());
  priceInput.addEventListener('change', () => updateOutput());
  eventSelect.addEventListener('change', () => updateOutput());

  await refreshData();
};
