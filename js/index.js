import { recipes } from './recipes.js'

let ingredientsList = []
let applianceList = []
let ustensilsList = []

function fetchData() {
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

fetchData()
