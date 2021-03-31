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
		buttonIngredient.classList.add('btn', 'btn-primary', 'btn-sm')
		buttonIngredient.setAttribute('type', 'button')
		buttonIngredient.textContent = ingredient + ' ❌'
		buttonIngredient.addEventListener('click', (e) => {
			e.preventDefault()
			recipeService.removeSelectedIngredient(ingredient)
			displaySelectedTags()
			displayDropdowns()
		})
		selectedTagsDiv.append(buttonIngredient)
	})

	selectedAppliance.forEach((appliance) => {
		const buttonAppliance = document.createElement('button')
		buttonAppliance.classList.add('btn', 'btn-success', 'btn-sm')
		buttonAppliance.setAttribute('type', 'button')
		buttonAppliance.textContent = appliance + ' ❌'
		buttonAppliance.addEventListener('click', (e) => {
			e.preventDefault()
			recipeService.removeSelectedAppliance(appliance)
			displaySelectedTags()
			displayDropdowns()
		})
		selectedTagsDiv.append(buttonAppliance)
	})

	selectedUstensils.forEach((ustensil) => {
		const buttonUstensil = document.createElement('button')
		buttonUstensil.classList.add('btn', 'btn-danger', 'btn-sm')
		buttonUstensil.setAttribute('type', 'button')
		buttonUstensil.textContent = ustensil + ' ❌'
		buttonUstensil.addEventListener('click', (e) => {
			e.preventDefault()
			recipeService.removeSelectedUstensil(ustensil)
			displaySelectedTags()
			displayDropdowns()
		})
		selectedTagsDiv.append(buttonUstensil)
	})

}

function displayDropdowns() {
	const dropdownIngredient = document.querySelector('.ingredients')
	const dropdownAppliance = document.querySelector('.appliance')
	const dropdownUstensils = document.querySelector('.ustensils')

	dropdownIngredient.innerHTML = ''
	dropdownAppliance.innerHTML = ''
	dropdownUstensils.innerHTML = ''

	recipeService.getAllIngredients().forEach((ingredient) => {
		const htmlBloc = getDropdownHtmlBloc(ingredient)
		htmlBloc.addEventListener('click', () => {
			recipeService.addSelectedIngredient(ingredient)
			displaySelectedTags()
			displayDropdowns()
		})
		dropdownIngredient.append(htmlBloc)
	})

	recipeService.getAllAppliance().forEach((appliance) => {
		const htmlBloc = getDropdownHtmlBloc(appliance)
		htmlBloc.addEventListener('click', () => {
			recipeService.addSelectedAppliance(appliance)
			displaySelectedTags()
			displayDropdowns()
		})
		dropdownAppliance.append(htmlBloc)
	})

	recipeService.getAllUstensils().forEach((ustensil) => {
		const htmlBloc = getDropdownHtmlBloc(ustensil)
		htmlBloc.addEventListener('click', () => {
			recipeService.addSelectedUstensil(ustensil)
			displaySelectedTags()
			displayDropdowns()
		})
		dropdownUstensils.append(htmlBloc)
	})

	function getDropdownHtmlBloc(text) {
		const a = document.createElement('a')
		const div = document.createElement('div')

		div.classList.add('col-4')
		a.classList.add('dropdown-item')
		a.textContent = text

		a.addEventListener('click', (e) => {
			e.preventDefault()
		})

		div.append(a)
		return div
	}
}

function displayRecipes() {
	const recipeList = document.querySelector('.recipe-list')
	const recipesList = recipeService.getAllRecipes()

	recipesList.forEach((recipe) => {
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
}

displaySelectedTags()
displayDropdowns()
displayRecipes()
