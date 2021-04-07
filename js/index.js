import { RecipeService } from './RecipeService.js'

const recipeService = new RecipeService()

function displaySelectedTags() {
    const selectedTagsDiv = document.querySelector('.tags')
    const selectedIngredients = recipeService.getSelectedIngredients()
    const selectedUstensils = recipeService.getSelectedUstensils()
    const selectedAppliance = recipeService.getSelectedAppliance()

    selectedTagsDiv.innerHTML = ''

    selectedIngredients.forEach((ingredient) => {
        const buttonIngredient = document.createElement('button')
        buttonIngredient.classList.add('btn', 'btn-primary')
        buttonIngredient.setAttribute('type', 'button')
        buttonIngredient.textContent = ingredient + ' ✖'
        buttonIngredient.addEventListener('click', (e) => {
            e.preventDefault()
            recipeService.removeSelectedIngredient(ingredient)
            displayRecipes()
        })
        selectedTagsDiv.append(buttonIngredient)
    })

    selectedAppliance.forEach((appliance) => {
        const buttonAppliance = document.createElement('button')
        buttonAppliance.classList.add('btn', 'btn-success')
        buttonAppliance.setAttribute('type', 'button')
        buttonAppliance.textContent = appliance + ' ✖'
        buttonAppliance.addEventListener('click', (e) => {
            e.preventDefault()
            recipeService.removeSelectedAppliance(appliance)
            displayRecipes()
        })
        selectedTagsDiv.append(buttonAppliance)
    })

    selectedUstensils.forEach((ustensil) => {
        const buttonUstensil = document.createElement('button')
        buttonUstensil.classList.add('btn', 'btn-danger')
        buttonUstensil.setAttribute('type', 'button')
        buttonUstensil.textContent = ustensil + ' ✖'
        buttonUstensil.addEventListener('click', (e) => {
            e.preventDefault()
            recipeService.removeSelectedUstensil(ustensil)
            displayRecipes()
        })
        selectedTagsDiv.append(buttonUstensil)
    })
}

function displayDropdowns() {
    const dropdownIngredient = document.querySelector('.dropdownIngredients')
    const dropdownAppliance = document.querySelector('.dropdownAppliance')
    const dropdownUstensils = document.querySelector('.dropdownUstensils')
    const ingredientInput = document.querySelector('.ingredientInput')
    const applianceInput = document.querySelector('.applianceInput')
    const ustensilInput = document.querySelector('.ustensilInput')
    const ingredientNotFound = document.querySelector('.ingredientNotFound')
    const applianceNotFound = document.querySelector('.applianceNotFound')
    const ustensilNotFound = document.querySelector('.ustensilNotFound')

    const filteredIngredients = recipeService.getFilteredIngredients()
    const filteredUstensils = recipeService.getFilteredUstensils()
    const filteredAppliance = recipeService.getFilteredAppliance()

    dropdownIngredient.innerHTML = ''
    dropdownAppliance.innerHTML = ''
    dropdownUstensils.innerHTML = ''

    ingredientNotFound.textContent = ''
    ustensilNotFound.textContent = ''
    applianceNotFound.textContent = ''

    if (filteredIngredients.length === 0)
        ingredientNotFound.textContent =
            "Il n'y a pas d'autre ingrédient disponible"
    if (filteredUstensils.length === 0)
        ustensilNotFound.textContent =
            "Il n'y a pas d'autre ustensile disponible"
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

    ingredientInput.addEventListener('input', (e) => {
        dropdownIngredient.innerHTML = ''
        recipeService.addIngredientTextFilter(e.target.value)
        recipeService.getFilteredIngredients().forEach((ingredient) => {
            const htmlBloc = getDropdownHtmlBloc(ingredient)
            htmlBloc.addEventListener('click', () =>
                onClickIngredient(ingredient)
            )
            dropdownIngredient.append(htmlBloc)
        })
    })

    applianceInput.addEventListener('input', (e) => {
        dropdownAppliance.innerHTML = ''
        recipeService.addApplianceTextFilter(e.target.value)
        recipeService.getFilteredAppliance().forEach((appliance) => {
            const htmlBloc = getDropdownHtmlBloc(appliance)
            htmlBloc.addEventListener('click', () =>
                onClickAppliance(appliance)
            )
            dropdownAppliance.append(htmlBloc)
        })
    })

    ustensilInput.addEventListener('input', (e) => {
        dropdownUstensils.innerHTML = ''
        recipeService.addUstensilTextFilter(e.target.value)
        recipeService.getFilteredUstensils().forEach((ustensil) => {
            const htmlBloc = getDropdownHtmlBloc(ustensil)
            htmlBloc.addEventListener('click', () => onClickUstensil(ustensil))
            dropdownUstensils.append(htmlBloc)
        })
    })

    function getDropdownHtmlBloc(text) {
        const a = document.createElement('a')
        const div = document.createElement('div')

        a.classList.add('dropdown-item')
        a.textContent = text

        a.addEventListener('click', (e) => e.preventDefault())

        div.append(a)
        return div
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

function searchbarBehaviour() {
    const searchBar = document.querySelector('.searchBar')

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
}

displayRecipes()
searchbarBehaviour()
