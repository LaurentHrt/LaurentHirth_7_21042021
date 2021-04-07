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
	const dropdownIngredient = document.querySelector('.ingredients')
	const dropdownAppliance = document.querySelector('.appliance')
	const dropdownUstensils = document.querySelector('.ustensils')
	const ingredientInput = document.querySelector('.ingredientInput')
	const applianceInput = document.querySelector('.applianceInput')
	const ustensilInput = document.querySelector('.ustensilInput')

	dropdownIngredient.innerHTML = ''
	dropdownAppliance.innerHTML = ''
	dropdownUstensils.innerHTML = ''

	recipeService.getFilteredIngredients(ingredientInput.value).forEach((ingredient) => {
		const htmlBloc = getDropdownHtmlBloc(ingredient)
		htmlBloc.addEventListener('click', () => onClickIngredient(ingredient))
		dropdownIngredient.append(htmlBloc)
	})

	recipeService.getFilteredAppliance(applianceInput.value).forEach((appliance) => {
		const htmlBloc = getDropdownHtmlBloc(appliance)
		htmlBloc.addEventListener('click', () => onClickAppliance(appliance))
		dropdownAppliance.append(htmlBloc)
	})

	recipeService.getFilteredUstensils(ustensilInput.value).forEach((ustensil) => {
		const htmlBloc = getDropdownHtmlBloc(ustensil)
		htmlBloc.addEventListener('click', () => onClickUstensil(ustensil))
		dropdownUstensils.append(htmlBloc)
	})

	

	function getDropdownHtmlBloc(text) {
		const a = document.createElement('a')
		const div = document.createElement('div')

		div.classList.add('col-4')
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
		notFound.textContent = 'Aucune recette ne correspond à votre critère… Vous pouvez chercher « tarte aux pommes », « poisson », etc.'
		return
	}
	
	displayedRecipesList.forEach((recipe) => {
		recipeList.innerHTML += `<div class="col-xl-4 col-lg-6 col-md-6">
			<div class="card mb-4 shadow-sm">
				<svg class="card-img-top bg-secondary"></svg>
				<div class="card-body">
					<div class="row no-gutters">
						<h5 class="col-8 card-title text-truncate">${recipe.name}</h5>
						<h5 class="col card-title">⏱ ${recipe.time} min</h5>
					</div>
					<div class="row recipeCard__text">
						<p class="col-6 card-text font-weight-bold">
							${recipe.ingredients.map((ingredient) => ingredient.ingredient + (ingredient?.quantity ? ' : ' + ingredient.quantity : '') + (ingredient.unit || '')).join('<br>')}
						</p>
						<p class="col-6 card-text">
							${recipe.description}
						</p>
					</div>
				</div>
			</div>
		</div>`
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
