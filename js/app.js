// constructors

function Insurance(brand, year, type){
    this.brand = brand;
    this.year = year;
    this.type = type;
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
        div.classList.add('message', 'error');
    }else {
        div.classList.add('message', 'correct')
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

// instantiate ui

const ui = new UI();
console.log(ui)

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
    const year = document.querySelector('#year').value;

    // read the type of coverage
    const type = document.querySelector('input[name= "type"]:checked').value;

    if (brand === '' || year === '' || type === '') {
        ui.showMessage('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.showMessage('Cotizando...', 'exito');

    // instantiate insurance

    // use the prototype to be quoted
}