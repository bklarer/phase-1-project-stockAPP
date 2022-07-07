
const BASE_URL = "https://api.coingecko.com/api/v3/search?query=";

const submitBttn = document.querySelector("#submit-button");
const tickerInput = document.querySelector("#ticker").value;
const stockForm = document.querySelector("#stock-form");
const searchContainer = document.querySelector("#searchContainer");
const resultsTable = document.querySelector("#resultsTable");

document.addEventListener("submit", handleSubmit);

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
        console.log(error));

}


function searchResults (data) {
    const results = {};
    const coin = data.coins;
    for(i=0; i<10; i++) {
        results[i] = coin[i]
        const searchResult = document.createElement("tr");
        
        const searchId = document.createElement("td");
            searchId.textContent = results[i].id;
        
        const searchName = document.createElement("td");
            searchName.textContent = results[i].name;
        
        const searchSymbol = document.createElement("td");
            searchSymbol.textContent = results[i].symbol;
        
        const searchMarketCap = document.createElement("td");
            searchMarketCap.textContent = results[i].market_cap_rank;
        
        
            searchResult.append(searchId, searchName, searchSymbol, searchMarketCap);
            resultsTable.append(searchResult);
    }
    console.log(results);
}