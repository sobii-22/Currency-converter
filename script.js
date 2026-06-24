const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    const option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;

    if (select.name === "From" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "To" && currCode === "PKR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

// Flag updater
function updateFlag(selectElement) {
  const currCode = selectElement.value;
  const countryCode = countryList[currCode];
  const img = selectElement.parentElement.querySelector("img");
  img.src = https://flagsapi.com/${countryCode}/flat/64.png;
}

// Fetch exchange rate
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const amountInput = document.querySelector(".amount input");
  let amountVal = amountInput.value.trim();

  if (amountVal === "" || isNaN(amountVal) || Number(amountVal) <= 0) {
    amountVal = "1";
    amountInput.value = "1";
  }

  const URL = https://api.exchangerate-api.com/v4/latest/${fromCurr.value};
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data.rates[toCurr.value];
    const finalAmount = (amountVal * rate).toFixed(2);
    msg.innerText = ${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value};
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error(error);
  }
});
