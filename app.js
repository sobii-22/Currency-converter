const BASE_URL = "https://api.exchangerate-api.com/v4/latest/${fromCurr.value};";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".From select");
const ToCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
        for (currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "From" && currCode === "USD"){
        newOption.selected= "selected";
    } else if(select.name === "To" && currCode === "PKR"){
        newOption.selected= "selected";
     }
    select.append(newOption);
}
select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
});
}


const updateFlag= (element)=>{
    console.log(element);
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newScr= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal === 0){
        amtVal = 1;
        amtVal = "1";
    }
    const URL  = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let rate = data[ToCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${ToCurr.value}`;
}); 