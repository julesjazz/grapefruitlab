const eventSelect = document.getElementById('field-product');
const countInput = document.getElementById('field-count');
const maxInput = document.getElementById('max');

const priceInput = document.getElementById('field-price');
const priceTotal = document.getElementById('total-price-output');
const availableOut = document.getElementById('tickets-available-output');

const updateTotal = () => {
  if (priceInput.value && countInput.value) {
    const total = Number(priceInput.value * countInput.value).toFixed(2);
    priceTotal.value = `$${total}`;
  } else {
    priceTotal.value = 'n/a';
  }
}

const getOnSale = (event) => {
  const data = tickets.find((ticket) => ticket.event === event);
  return data.onSale;
}

const updateLimit = () => {
  const val = eventSelect.value.split('@event@');
  const perf = val[1];
  const max = getOnSale(perf);

  countInput.setAttribute('max', max);
  maxInput.setAttribute('value', max);
  availableOut.value = max > 0
    ? max
    : 'SOLD OUT';
}

const updateTicketInfo = (data) => {
  tickets.forEach((ticket, index) => {
    const newData = data.find((item) => ticket.event === item.event);
    if (newData) { tickets[index] = {...ticket, ...newData}; }
  });
}

const getTicketInfo = async () => {
  const response = await fetch(
    '/api/tickets/?' + new URLSearchParams({ show })
  );
  const data = await response.json();
  return data.data;
}

const refreshData = async () => {
  const info = await getTicketInfo();
  updateTicketInfo(info);
  updateLimit();
}

window.onload = async () => {
  countInput.addEventListener('change', () => updateTotal());
  priceInput.addEventListener('change', () => updateTotal());
  eventSelect.addEventListener('change', () => updateLimit());

  await refreshData();
};
