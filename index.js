
const BASE_URL = "https://api.coingecko.com/api/v3/search?query=";
const PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids="

const submitBttn = document.querySelector("#submit-button");
const tickerInput = document.querySelector("#ticker");
const stockForm = document.querySelector("#stock-form");
const searchContainer = document.querySelector("#searchContainer");
const resultsTable = document.querySelector("#resultsTable");
const watchlistTable = document.querySelector("#watchlistTable");
const capTable = document.querySelector("#capTable");

document.addEventListener("submit", handleSubmit);

function handleSubmit (e) {
    e.preventDefault();
    
    console.log("I work");
    
    

    fetch(BASE_URL + `${tickerInput.value}`)
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
        priceIds = priceIds + "%2C" + results[i]["id"]
    }

    console.log(priceIds)

    let copyPrices = {}

    fetch(PRICE_URL + priceIds + "&vs_currencies=usd")
        .then(priceData => priceData.json())
        .then(prices => {
            copyPrices = prices
            tableMaker()
            console.log(prices)
            console.log(copyPrices)
            }
        )
        
        .catch(error => console.log(error));

    function tableMaker () {for(i=0; i<10; i++) { //need if statement just in case
        const cryptoId = results[i].id;
        const dollarUS = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        })
        
        results[i].price = dollarUS.format(copyPrices[cryptoId].usd)

        const searchResult = document.createElement("tr");
            searchResult.id = results[i].id;
        
        const searchName = document.createElement("td");
            searchName.textContent = results[i].name;
        
        const searchSymbol = document.createElement("td");
            searchSymbol.textContent = results[i].symbol;
        
        const searchMarketCap = document.createElement("td");
            searchMarketCap.textContent = results[i].market_cap_rank;

        const searchPrice = document.createElement("td");
            searchPrice.textContent = results[i].price;
            
        const watchlistSymbol = document.createElement("td");
            watchlistSymbol.textContent = results[i].symbol;
        
        const watchlistPrice = document.createElement("td");
            watchlistPrice.textContent = results[i].price;
        
        const addBttn = document.createElement("button");
            addBttn.textContent = "Add to Watchlist";
            addBttn.className = "add";
            addBttn.addEventListener("click", () => {
                addToWatchlist(watchlistSymbol, watchlistPrice)
                addBttn.disabled = true;
            }
        );
            
            
            searchResult.append(searchName, searchSymbol, searchMarketCap, searchPrice, addBttn);
            resultsTable.append(searchResult);
        }
    }
    console.log(results)
    
}

function addToWatchlist(watchlistSymbol, watchlistPrice) {
    
    const watchlistRow = document.createElement("tr");
    const deletebttn = document.createElement("button");
        deletebttn.textContent = "delete";
        deletebttn.className = "delete";


    watchlistRow.append(watchlistSymbol, watchlistPrice, deletebttn);
    watchlistTable.append(watchlistRow);


}