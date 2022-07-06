
const BASE_URL = "https://api.coingecko.com/api/v3/search?query=";

const submitBttn = document.querySelector("#submit-button");
const tickerInput = document.querySelector("#ticker").value;
const stockForm = document.querySelector("#stock-form");

document.addEventListener("submit", handleSubmit)

function handleSubmit (e) {
    e.preventDefault();
    
    console.log("I work");
    
    

    fetch(BASE_URL + `${tickerInput}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            searchResults(data)
            stockForm.reset()
            }
        )
        .catch(error => 
        console.log(error))

}


function searchResults (data) {
    const results = {}
    const coin = data.coins
    for(i=0; i<10; i++) {
        results[i] = coin[i]
        // results.search.name = coin[i].name
        // results.search.symbol = coin[i].symbol
        // results.search.market_cap_rank = coin[i].market_cap_rank
    }
    console.log(results)
}
