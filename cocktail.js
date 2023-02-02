const loadCocktails = async (searchType, search, datalimit) => {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchType}=${search}`;

    const res = await fetch(url);
    const data = await res.json();
    displayCocktails(data.drinks, datalimit);
};

// display cards
const displayCocktails = (drinks, datalimit) => {
    // console.log(drinks);
    const showAllBtn = document.getElementById('show-all-btn');
    if (datalimit && drinks.length > 6) {
        drinks = drinks.slice(0, 6);
        showAllBtn.classList.remove('d-none');
    } else {
        showAllBtn.classList.add('d-none');
    }
    const notFoundText = document.getElementById('not-found-text');

    const drinksCardContainer = document.getElementById('drinks-card-container');

    drinksCardContainer.innerText = '';
    if (drinks === null) {
        notFoundText.classList.remove('d-none');
    } else {
        notFoundText.classList.add('d-none');
        drinks.forEach(drink => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text">Category: ${drink.strCategory}</p>
                <button type="button" onclick="showDetails(${drink.idDrink})" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#Cocktails-Details">Show Details</button>
             </div>
        </div>
        `;

            drinksCardContainer.appendChild(div);

        });
    }
    spinner(false);
};

// search by api
const searchItem = datalimit => {

    const searchInput = document.getElementById('inputSearch');

    const search = searchInput.value;

    if (search.length === 1) {
        loadCocktails('f', search, datalimit);
    } else {
        loadCocktails('s', search, datalimit)
    }
};

// press enter
document.getElementById('inputSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        searchItem(5);
        spinner(true);
    }
});

// click on search button
const searchBtn = () => {
    searchItem(5);
    spinner(true);
}

// Show Details
const showDetails = async cocktailsId => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailsId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayCocktailDetails(data.drinks[0]);
};

// Display cocktail details
const displayCocktailDetails = detail => {
    // console.log(detail);
    document.getElementById('Cocktails-DetailsLabel').innerText = `${detail.strDrink}`;

    document.getElementById('cocktails-details').innerHTML = `
        <img src="${detail.strDrinkThumb}" class="d-flex mx-auto" height="150px" width="100px">
            <h3 class="text-center">Glass: ${detail.strGlass}</h3>
            <h4 class="text-center">Ingredient1: ${detail.strIngredient1}</h4>
            <h4 class="text-center">Ingredient2: ${detail.strIngredient2}</h4>
            <h4 class="text-center">Ingredient3: ${detail.strIngredient3}</h4>
            <h4 class="text-center">Ingredient4: ${detail.strIngredient4}</h4>
            <h5 class="text-center">Instructions: ${detail.strInstructions}</h5>
            `;
};

// show all drinks
const showAllDrinks = () => {
    searchItem();
}

// spinner togele
const spinner = isStart => {
    const spinnerId = document.getElementById('spinnerID');
    if (isStart === true) {
        spinnerId.classList.remove('d-none');
    } else {
        spinnerId.classList.add('d-none');
    }
};

// always show
loadCocktails('s', 'margarita', 5);