let searchInputEl = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //1 div container
    let searchItemEl = document.createElement("div");
    searchItemEl.classList.add("result-item");
    searchResults.appendChild(searchItemEl);
    //2 a element 
    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    searchItemEl.appendChild(titleEl);

    //3 title break
    let titleBr = document.createElement("br");
    searchItemEl.appendChild(titleBr);
    //4 anchor element 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    searchItemEl.appendChild(urlEl);

    //5 line break
    let lineBr = document.createElement("br");
    searchItemEl.appendChild(lineBr);
    //6 paragraph description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-description");
    descriptionEl.textContent = description;
    searchItemEl.appendChild(descriptionEl);
}


function displaySearchResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }

}


function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySearchResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);