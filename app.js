//problem in finding currency exchange api
BASE_URL = "https://open.er-api.com/v6/latest/USD";

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

window.addEventListener('load',()=>{
    updateExchangeRate();
})

for(let select of dropdowns){
    for (let currCode in countryList) {
        const newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        
        if(select.name === "from" && currCode === 'USD'){
            newOption.selected = "selected";
        } else if (currCode === 'NPR' && select.name ==='to'){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change', (e)=>{
        updateflag(e.target);
    });

}

updateflag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src=newSrc;

}

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if(amountVal<1){
        amountVal=1;
        amount.value = 1;
    }
    const URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let convertingCurr = toCurr.value;
    let rate = data.rates[convertingCurr];
    let calculatedAmt = amountVal * rate;
    let displayMsg = `${amountVal} ${fromCurr.value} = ${calculatedAmt} ${toCurr.value}`;
    msg.innerText = displayMsg;

}
btn.addEventListener('click', (e)=>{
    e.preventDefault();
    updateExchangeRate();
});

