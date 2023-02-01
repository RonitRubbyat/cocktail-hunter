const loadCocktails = async (searchType, search) => {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchType}=${search}`;

    const res = await fetch(url);
    const data = await res.json();
    displayCocktails(data.drinks);
};

// display cards
const displayCocktails = (drinks) => {
    // console.log(drinks);

    const notFoundText = document.getElementById('not-found-text');
    if (drinks === null) {
        notFoundText.classList.remove('d-none');
    } else {
        notFoundText.classList.add('d-none');
    }

    const drinksCardContainer = document.getElementById('drinks-card-container');

    drinksCardContainer.innerText = '';
    
    if (drinks !== null) {
        drinks.forEach(drink => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text">Category: ${drink.strCategory}</p>
                <button type="button" class="btn btn-outline-secondary">Show Details</button>
             </div>
        </div>
        `;

            drinksCardContainer.appendChild(div);

        });
    }
    spinner(false);
};

// search by api
const searchItem = () => {
    const searchInput = document.getElementById('inputSearch');

    const search = searchInput.value;

    if (search.length === 1) {
        loadCocktails('f', search);
    } else {
        loadCocktails('s', search)
    }
};

// press enter
document.getElementById('inputSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        searchItem();
        spinner(true);
    }
});

// click on search button
const searchBtn = () => {
    searchItem();
    spinner(true);
}

const spinner = isStart => {
    const spinnerId = document.getElementById('spinnerID');
    if (isStart === true) {
        spinnerId.classList.remove('d-none');
    } else {
        spinnerId.classList.add('d-none');
    }
}

// always show
// loadCocktails('s','margarita');