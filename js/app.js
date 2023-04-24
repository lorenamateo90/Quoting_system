// constructors
function Insurance(brand, year, type){
    this.brand = brand;
    this.year = year;
    this.type = type;
}

// make the quotation with data
Insurance.prototype.quoteInsurance = function(){
    /*
        1 = Volkswagen 1.15
        2 = Hyundai 1.05
        3 = Ford 1.3
    */

    let amount;
    const base = 1000;

    switch(this.brand){
        case '1':
            amount = base * 1.15;
            break;
        case '2':
            amount = base * 1.05;
            break;
        case '3': 
            amount = base * 1.3;
            break;

            default: 
                break;
    }

    // read year
    const difference = new Date().getFullYear() - this.year;

    // each year that the price is higher, the value of the insurance is reduced by 3%.
    amount -= ((difference * 3) * amount) / 100;

    /*
        if the insurance is basic it's multiplied by 30%
        if the insurance is complete, it's multiplied by 50%
    */

    if(this.type === 'basico') {
        amount *= 1.30;
    } else {
        amount *= 1.50;
    }
    return amount;
}

function UI(){}

// fill in the year options
UI.prototype.fillOptions = () => {
    const max = new Date().getFullYear();
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// shows alert on screen
UI.prototype.showMessage = (message, type) => {
    const div = document.createElement('div');

    if(type === 'error'){
        div.classList.add('error');
    }else {
        div.classList.add('sucess')
    }
    div.classList.add('message', 'mt-10');
    div.textContent = message;

    // insert in hmtl
    const form = document.querySelector('#quote-insurance');
    form.insertBefore(div, document.querySelector('#result'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.showResult = ( insurance, total ) => {

    const { brand, year, type } = insurance;
    let brandText;

    switch(brand) {
        case '1':
            brandText = 'Volkswagen';
            break;
        case '2':
            brandText = 'Hyundai';
            break;
        case '3':
            brandText = 'Ford';
            break;
        default:
            break;
    }


    // create the result
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class= 'header'>Tu resumen</p>
    <p class= 'font-bold'>Marca: <span class="font-normal">${brandText}</span></p>
    <p class= 'font-bold'>Año: <span class="font-normal">${year}</span></p>
    <p class= 'font-bold'>Tipo: <span class="font-normal">${type}</span></p>
    <p class= 'font-bold'>Total: <span class="font-normal"> $ ${total}</span></p>
    `;

    const resultDiv = document.querySelector('#result');
 
    // show spinner
    const spinner = document.querySelector('#loading');
    spinner.style.display = 'block';

    setTimeout(() =>{
        spinner.style.display = 'none'; // spinner is deleted
        resultDiv.appendChild(div); // the result
    },3000)
}

// instantiate ui
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.fillOptions(); // fill the select with years
})

eventListeners();
function eventListeners(){
    const form = document.querySelector('#quote-insurance');
    form.addEventListener('submit', quoteInsurance);
}

function quoteInsurance(e) { 
    e.preventDefault();
    
    // read the selected brand
    const brand = document.querySelector('#brand').value;

    // read the selected year
    const yeaR = document.querySelector('#year').value;

    // read the type of coverage
    const type = document.querySelector('input[name= "type"]:checked').value;

    if (brand === '' || yeaR === '' || type === '') {
        ui.showMessage('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.showMessage('Cotizando...', 'sucess');

    // hide previous quotations
    const results = document.querySelector('#result div');
    if (results != null){
        results.remove();
    }

    // instantiate insurance
    const insurance = new Insurance(brand, yeaR, type);
    const totality = insurance.quoteInsurance();


    // use the prototype to be quoted
    ui.showResult(insurance, totality);
}