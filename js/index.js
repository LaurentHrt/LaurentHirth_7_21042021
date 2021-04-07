import { RecipeService } from './RecipeService.js'

const recipeService = new RecipeService()

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
            displayRecipes()
        })
    })

    selectedAppliance.forEach((appliance) => {
        const htmlBloc = getSelectedTagHtmlBloc(appliance, 'btn-success')
        selectedTagsDiv.append(htmlBloc)
        htmlBloc.addEventListener('click', () => {
            recipeService.removeSelectedAppliance(appliance)
            displayRecipes()
        })
    })

    selectedUstensils.forEach((ustensil) => {
        const htmlBloc = getSelectedTagHtmlBloc(ustensil, 'btn-danger')
        selectedTagsDiv.append(htmlBloc)
        htmlBloc.addEventListener('click', () => {
            recipeService.removeSelectedUstensil(ustensil)
            displayRecipes()
        })
    })

    function getSelectedTagHtmlBloc(text, style) {
        const selectedTagTemplate = document
            .querySelector('.selectedTagTemplate')
            .content.firstElementChild.cloneNode(true)
        selectedTagTemplate.classList.add(style)
        selectedTagTemplate.textContent = text + ' ✖'
        return selectedTagTemplate
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

    ingredientNotFound.textContent = ''
    ustensilNotFound.textContent = ''
    applianceNotFound.textContent = ''

    dropdownIngredient.innerHTML = ''
    dropdownAppliance.innerHTML = ''
    dropdownUstensils.innerHTML = ''

    if (filteredIngredients.length === 0)
        ingredientNotFound.textContent =
            "Il n'y a pas d'autre ingrédient disponible"
    if (filteredUstensils.length === 0)
        ustensilNotFound.textContent =
            "Il n'y a pas d'autre ustensil disponible"
    if (filteredAppliance.length === 0)
        applianceNotFound.textContent =
            "Il n'y a pas d'autre appareil disponible"

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
        displayRecipes()
    }

    function onClickAppliance(appliance) {
        recipeService.addSelectedAppliance(appliance)
        displayRecipes()
    }

    function onClickUstensil(ustensil) {
        recipeService.addSelectedUstensil(ustensil)
        displayRecipes()
    }
}

function displayRecipes() {
    const recipeList = document.querySelector('.recipe-list')
    const notFound = document.querySelector('.notFound')
    const displayedRecipesList = recipeService.getFilteredRecipes()

    recipeList.innerHTML = ''
    notFound.textContent = ''

    if (displayedRecipesList.length === 0) {
        notFound.textContent =
            'Aucune recette ne correspond à votre critère… Vous pouvez chercher « tarte aux pommes », « poisson », etc.'
        return
    }

    displayedRecipesList.forEach((recipe) => {
        const recipeTemplate = document.querySelector('.recipeTemplate')
        const clone = recipeTemplate.content.cloneNode(true)
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

    displayDropdowns()
    displaySelectedTags()
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
        } else {
            recipeService.removeRecipeTextFilter()
            displayRecipes()
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

displayRecipes()
initSearchbarBehaviour()
