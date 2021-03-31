import { RecipeService } from './RecipeService.js'

const recipeService = new RecipeService()

function displayDropdowns() {
	const dropdownIngredient = document.querySelector('.ingredients')
	const dropdownAppliance = document.querySelector('.appliance')
	const dropdownUstensils = document.querySelector('.ustensils')

	recipeService.getAllIngredients().forEach((ingredient) => {
		dropdownIngredient.innerHTML += getDropdownHtmlBloc(ingredient)
	})

	recipeService.getAllAppliance().forEach((appliance) => {
		dropdownAppliance.innerHTML += getDropdownHtmlBloc(appliance)
	})

	recipeService.getAllUstensils().forEach((ustensil) => {
		dropdownUstensils.innerHTML += getDropdownHtmlBloc(ustensil)
	})

	function getDropdownHtmlBloc(text) {
		return `<div class="col-4">
			<a class="dropdown-item" href="#">
				${text}
			</a>
		</div>`
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

displayDropdowns()
displayRecipes()
