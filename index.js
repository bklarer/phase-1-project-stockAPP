
const BASE_URL = "https://api.coingecko.com/api/v3/search?query=";
const PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids="

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
        console.log(error)); //crypto not found

}


function searchResults (data) {
    const results = data.coins.slice(0,10)
    let priceIds = results[0]["id"]
    for(i=1; i<10; i++) {
        // idArray.push(results[i]["id"])
        priceIds = priceIds + "%2C" + results[i]["id"]
    }

    console.log(priceIds)

    // console.log(PRICE_URL + priceIds + "&vs_currencies=usd")

    fetch(PRICE_URL + priceIds + "&vs_currencies=usd")
        .then(priceData => priceData.json())
        .then(prices => {
            console.log(prices)}
        )
        
        .catch(error => console.log(error));

    // for(i=0; i<10; i++) { //need if statement just in case
    //     results[i] = coin[i]
    //     const searchResult = document.createElement("tr");
    //         searchResult.id = results[i].id
        
    //     const searchId = document.createElement("td");
    //         searchId.textContent = results[i].id;
        
    //     const searchName = document.createElement("td");
    //         searchName.textContent = results[i].name;
        
    //     const searchSymbol = document.createElement("td");
    //         searchSymbol.textContent = results[i].symbol;
        
    //     const searchMarketCap = document.createElement("td");
    //         searchMarketCap.textContent = results[i].market_cap_rank;

        
        
        
    //         searchResult.append(searchId, searchName, searchSymbol, searchMarketCap);
    //         resultsTable.append(searchResult);

    console.log(results)
    
}

        //need function to grab ids from results, and put into a string for the fetch above
        //once the fetch is initiated, I need to add the data to results