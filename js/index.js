import { recipes } from './recipes.js'

let ingredientsList = []
let applianceList = []
let ustensilsList = []

function displayDropdowns() {
	const dropdownIngredient = document.querySelector('.ingredients')
	const dropdownAppliance = document.querySelector('.appliance')
	const dropdownUstensils = document.querySelector('.ustensils')

	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			ingredientsList.push(ingredient.ingredient)
		})
		ustensilsList.push(...recipe.ustensils)
		applianceList.push(recipe.appliance)
	})

	ingredientsList.sort()
	applianceList.sort()
	ustensilsList.sort()
	ingredientsList = new Set(ingredientsList)
	applianceList = new Set(applianceList)
	ustensilsList = new Set(ustensilsList)

	ingredientsList.forEach((ingredient) => {
		const a = document.createElement('a')
		const div = document.createElement('div')
		div.append(a)
		a.classList.add('dropdown-item')
		div.classList.add('col-4')
		a.href = '#'
		a.textContent = ingredient
		dropdownIngredient.append(div)
	})

	applianceList.forEach((appliance) => {
		const a = document.createElement('a')
		const div = document.createElement('div')
		div.append(a)
		a.classList.add('dropdown-item')
		div.classList.add('col-4')
		a.href = '#'
		a.textContent = appliance
		dropdownAppliance.append(div)
	})

	ustensilsList.forEach((ustensil) => {
		const a = document.createElement('a')
		const div = document.createElement('div')
		div.append(a)
		a.classList.add('dropdown-item')
		div.classList.add('col-4')
		a.href = '#'
		a.textContent = ustensil
		dropdownUstensils.append(div)
	})
}

function displayRecipes() {
	const recipeList = document.querySelector('.recipe-list')

	recipes.forEach((recipe) => {
		const container = document.createElement('div')
		const card = document.createElement('div')
		const cardImg = document.createElement('svg')
		const cardBody = document.createElement('div')
		const cardTitles = document.createElement('div')
		const recipeName = document.createElement('h5')
		const recipeTime = document.createElement('h5')
		const cardTexts = document.createElement('div')
		const recipeIngredients = document.createElement('p')
		const recipeDescription = document.createElement('p')

		container.classList.add('col-lg-4', 'col-md-6')
		card.classList.add('card', 'mb-4', 'shadow-sm')
		cardImg.classList.add('card-img-top', 'bg-secondary')
		cardBody.classList.add('card-body')
		cardTitles.classList.add('row', 'no-gutters')
		recipeName.classList.add('col-8', 'card-title')
		recipeTime.classList.add('col', 'card-title')
		cardTexts.classList.add('row', 'no-gutters')
		recipeIngredients.classList.add('col-6', 'card-text', 'font-weight-bold')
		recipeDescription.classList.add('col-6', 'card-text')

		recipeName.textContent = recipe.name
		recipeTime.textContent = '⏱ ' + recipe.time + ' min'
		recipeDescription.textContent = recipe.description

		recipe.ingredients.forEach((ingredient) => {
			recipeIngredients.append(ingredient.ingredient + (ingredient.quantity ? ' : ' + ingredient.quantity : '') + (ingredient.unit || ''), document.createElement('br'))
		})

		container.append(card)
		card.append(cardImg, cardBody)
		cardBody.append(cardTitles, cardTexts)
		cardTitles.append(recipeName, recipeTime)
		cardTexts.append(recipeIngredients, recipeDescription)
		recipeList.append(container)
	})
}

displayDropdowns()
displayRecipes()
