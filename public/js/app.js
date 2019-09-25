console.log('js no front');

const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'Buscando cotação...'
    clearDados();

    event.preventDefault();
    const ativo = document.querySelector('input').value;

    if (!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado!';
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                mainMessage.innerText = `Alguma coisa deu errado!`;
                price.innerText = `${data.error.message} | Código: ${data.error.message}`
            } else {
                mainMessage.innerText = data.symbol;
                price.innerText = `PRICE: ${data.price}`;
                price_open.innerText = `OPEN: ${data.price_open}`;
                day_high.innerText = `HIGH: ${data.day_high}`;
                day_low.innerText = `LOW: ${data.day_low}`;
            }
    
        });
    });

});

const clearDados = () => {
    price.innerText = '';
    price_open.innerText = '';
    day_high.innerText = '';
    day_low.innerText = '';
}
