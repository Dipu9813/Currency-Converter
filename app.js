//problem in finding currency exchange api
BASE_URL = "https://open.er-api.com/v6/latest/USD";

const dropdowns = document.querySelectorAll('.dropdown select');


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
