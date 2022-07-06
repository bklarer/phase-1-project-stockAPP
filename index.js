
const BASE_URL = "https://api.coingecko.com/api/v3/coins/";

const submitBttn = document.querySelector("#submit-button");
const tickerInput = document.querySelector("#ticker").value;

document.addEventListener("submit", handleSubmit)

function handleSubmit (e) {
    e.preventDefault();
    
    console.log("I work");
    
    fetch(BASE_URL + "list")
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => 
        console.log(error))

}



