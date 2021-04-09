import { RecipeService } from './RecipeService.js'

const recipeService = new RecipeService()

function displayPage() {
    displayRecipes()
    displaySelectedTags()
    displayDropdowns()
}

function displayRecipes() {
    const recipeList = document.querySelector('.recipe-list')
    const notFound = document.querySelector('.recipeNotFound')
    const displayedRecipesList = recipeService.getFilteredRecipes()

    recipeList.innerHTML = ''
    notFound.hidden = displayedRecipesList.length !== 0

    displayedRecipesList.forEach((recipe) => {
        const clone = document
            .querySelector('.recipeTemplate')
            .content.cloneNode(true)
        const recipeName = clone.querySelector('.recipeName')
        const recipeTime = clone.querySelector('.recipeTime')
        const recipeIngredients = clone.querySelector('.recipeIngredients')
        const recipeDescription = clone.querySelector('.recipeDescription')

        recipeName.textContent = recipe.name
        recipeTime.textContent = '⏱ ' + recipe.time + ' min'
        recipeIngredients.innerHTML = recipe.ingredients
            .map(
                (ingredient) =>
                    ingredient.ingredient +
                    (ingredient?.quantity ? ' : ' + ingredient.quantity : '') +
                    (ingredient.unit || '')
            )
            .join('<br>')
        recipeDescription.textContent = recipe.description

        recipeList.append(clone)
    })
}

function displaySelectedTags() {
    const selectedTagsDiv = document.querySelector('.tags')
    const selectedIngredients = recipeService.getSelectedIngredients()
    const selectedUstensils = recipeService.getSelectedUstensils()
    const selectedAppliance = recipeService.getSelectedAppliance()

    selectedTagsDiv.innerHTML = ''

    selectedIngredients.forEach((ingredient) => {
        const htmlBloc = getSelectedTagHtmlBloc(ingredient, 'btn-primary')
        selectedTagsDiv.append(htmlBloc)
        htmlBloc.addEventListener('click', () => {
            recipeService.removeSelectedIngredient(ingredient)
            displayPage()
        })
    })

    selectedAppliance.forEach((appliance) => {
        const htmlBloc = getSelectedTagHtmlBloc(appliance, 'btn-success')
        selectedTagsDiv.append(htmlBloc)
        htmlBloc.addEventListener('click', () => {
            recipeService.removeSelectedAppliance(appliance)
            displayPage()
        })
    })

    selectedUstensils.forEach((ustensil) => {
        const htmlBloc = getSelectedTagHtmlBloc(ustensil, 'btn-danger')
        selectedTagsDiv.append(htmlBloc)
        htmlBloc.addEventListener('click', () => {
            recipeService.removeSelectedUstensil(ustensil)
            displayPage()
        })
    })

    function getSelectedTagHtmlBloc(text, style) {
        const htmlBloc = document
            .querySelector('.selectedTagTemplate')
            .content.firstElementChild.cloneNode(true)
        htmlBloc.classList.add(style)
        htmlBloc.textContent = text + ' ✖'
        return htmlBloc
    }
}

function displayDropdowns() {
    const dropdownIngredient = document.querySelector('.dropdownIngredients')
    const dropdownAppliance = document.querySelector('.dropdownAppliance')
    const dropdownUstensils = document.querySelector('.dropdownUstensils')
    const ingredientNotFound = document.querySelector('.ingredientNotFound')
    const applianceNotFound = document.querySelector('.applianceNotFound')
    const ustensilNotFound = document.querySelector('.ustensilNotFound')
    const filteredIngredients = recipeService.getFilteredIngredients()
    const filteredUstensils = recipeService.getFilteredUstensils()
    const filteredAppliance = recipeService.getFilteredAppliance()

    dropdownIngredient.innerHTML = ''
    dropdownAppliance.innerHTML = ''
    dropdownUstensils.innerHTML = ''
    ingredientNotFound.hidden = filteredIngredients.length !== 0
    applianceNotFound.hidden = filteredAppliance.length !== 0
    ustensilNotFound.hidden = filteredUstensils.length !== 0

    filteredIngredients.forEach((ingredient) => {
        const htmlBloc = getDropdownHtmlBloc(ingredient)
        htmlBloc.addEventListener('click', () => onClickIngredient(ingredient))
        dropdownIngredient.append(htmlBloc)
    })

    filteredAppliance.forEach((appliance) => {
        const htmlBloc = getDropdownHtmlBloc(appliance)
        htmlBloc.addEventListener('click', () => onClickAppliance(appliance))
        dropdownAppliance.append(htmlBloc)
    })

    filteredUstensils.forEach((ustensil) => {
        const htmlBloc = getDropdownHtmlBloc(ustensil)
        htmlBloc.addEventListener('click', () => onClickUstensil(ustensil))
        dropdownUstensils.append(htmlBloc)
    })

    function getDropdownHtmlBloc(text) {
        const htmlBloc = document
            .querySelector('.dropdownItemTemplate')
            .content.firstElementChild.cloneNode(true)
        htmlBloc.textContent = text
        return htmlBloc
    }

    function onClickIngredient(ingredient) {
        recipeService.addSelectedIngredient(ingredient)
        displayPage()
    }

    function onClickAppliance(appliance) {
        recipeService.addSelectedAppliance(appliance)
        displayPage()
    }

    function onClickUstensil(ustensil) {
        recipeService.addSelectedUstensil(ustensil)
        displayPage()
    }
}

function initSearchbarBehaviour() {
    const searchBar = document.querySelector('.searchBar')
    const ingredientInput = document.querySelector('.ingredientInput')
    const applianceInput = document.querySelector('.applianceInput')
    const ustensilInput = document.querySelector('.ustensilInput')

    searchBar.addEventListener('input', (e) => {
        if (e.target.value.length > 2) {
            recipeService.addRecipeTextFilter(e.target.value)
            displayRecipes()
            displayDropdowns()
        } else {
            recipeService.removeRecipeTextFilter()
            displayRecipes()
            displayDropdowns()
        }
    })

    ingredientInput.addEventListener('input', (e) => {
        recipeService.addIngredientTextFilter(e.target.value)
        displayDropdowns()
    })

    applianceInput.addEventListener('input', (e) => {
        recipeService.addApplianceTextFilter(e.target.value)
        displayDropdowns()
    })

    ustensilInput.addEventListener('input', (e) => {
        recipeService.addUstensilTextFilter(e.target.value)
        displayDropdowns()
    })
}

displayPage()
initSearchbarBehaviour()
