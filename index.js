
const BASE_URL = "https://api.coingecko.com/api/v3/search?query=";
const PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids="

const submitBttn = document.querySelector("#submit-button");
const exportBttn = document.querySelector("#export")
const tickerInput = document.querySelector("#ticker");
const stockForm = document.querySelector("#stock-form");
const searchContainer = document.querySelector("#searchContainer");
const resultsTable = document.querySelector("#resultsTable");
const watchlistTable = document.querySelector("#watchlistTable");
const capTable = document.querySelector("#capTable");
const tableHTML = '<tr><th>Name</th><th>Symbol</th><th>Market Cap Rank</th><th>Price(USD)</th><th>Add to Watchlist</th></tr>'

document.addEventListener("submit", handleSubmit);

function handleSubmit (e) {
    e.preventDefault();

    fetch(BASE_URL + `${tickerInput.value}`)
        .then(resp => resp.json())
        .then(data => {
            resultsTable.innerHTML = tableHTML
            console.log(data)
            searchResults(data)
            stockForm.reset()
            }
        )
        .catch(error => {
        console.log(error);
        alert("Server Error") //crypto not found
        })
}


function searchResults (data) {
    const results = data.coins.slice(0,10)
    let priceIds

    if(results.length == 0) {
        console.log("No Results")
    } else priceIds = results[0]["id"]
    
    if (data.coins.length == 0 ) {
        alert("Crypto not found")
    } else if (results.length === 1){
        priceIds = priceIds
        } else {
        for(i=1; i<Math.min(10, priceIds.length); i++) {
            priceIds = priceIds + "%2C" + results[i]["id"]
        } 
    }

    let copyPrices = {}

    fetch(PRICE_URL + priceIds + "&vs_currencies=usd")
        .then(priceData => priceData.json())
        .then(prices => {
            copyPrices = prices
            tableMaker()
            }
        )
        
        .catch(error => {
            console.log(error);
            alert("Server Error");
        })

    function tableMaker () {for(i=0; i<Math.min(10, results.length); i++) { //need if statement just in case
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
                searchResult.remove()
            }
        );
            
            
            searchResult.append(searchName, searchSymbol, searchMarketCap, searchPrice, addBttn);
            resultsTable.append(searchResult);
        }
    }
    
}

function addToWatchlist(watchlistSymbol, watchlistPrice) {
    
    const watchlistRow = document.createElement("tr");
    const deletebttn = document.createElement("button");
        deletebttn.textContent = "delete";
        deletebttn.className = "delete";
        deletebttn.addEventListener("click", () => watchlistRow.remove())


    watchlistRow.append(watchlistSymbol, watchlistPrice, deletebttn);
    watchlistTable.append(watchlistRow);

}

exportBttn.addEventListener("click", exportWatchlist)

function exportWatchlist () {
    const rows = []
    
    for(let i = 0, row; row = watchlistTable.rows[i]; i++ ) {
        let column1 = row.cells[0].innerText;
            column1 = column1.replace(",", "")
        let column2 = row.cells[1].innerText;
            column2 = column2.replace(",", "")

        console.log(column1, column2)

        rows.push([column1, column2])
    }

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach((rowArray) => {
        row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("donload", "Crypto_Watchlist.csv");

    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);

}