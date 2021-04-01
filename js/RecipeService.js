import { recipes } from './recipes.js'

export class RecipeService {
	constructor() {
		this.allRecipes = recipes
		this.filteredRecipes = recipes
		this.allIngredient = [...new Set(this.allRecipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient)).sort())]
		this.allAppliance = [...new Set(this.allRecipes.flatMap((recipe) => recipe.appliance).sort())]
		this.allUstensils = [...new Set(this.allRecipes.flatMap((recipe) => recipe.ustensils).sort())]
		this.selectedIngredients = []
		this.selectedUstensils = []
		this.selectedAppliance = []
	}

	getAllRecipes() {
		return this.allRecipes
	}
	getFilteredRecipes() {
		return this.filteredRecipes
	}

	getAllIngredients() {
		return this.allIngredient
	}

	getAllAppliance() {
		return this.allAppliance
	}

	getAllUstensils() {
		return this.allUstensils
	}

	addSelectedIngredient(ingredient) {
		if (this.allIngredient.indexOf(ingredient) != -1) {
			this.selectedIngredients.push(...this.allIngredient.splice(this.allIngredient.indexOf(ingredient), 1))
			this._filterRecipes()
		}
	}
	addSelectedUstensil(ustensil) {
		if (this.allUstensils.indexOf(ustensil) != -1) {
			this.selectedUstensils.push(...this.allUstensils.splice(this.allUstensils.indexOf(ustensil), 1))
			this._filterRecipes()
		}
	}
	addSelectedAppliance(appliance) {
		if (this.allAppliance.indexOf(appliance) != -1) {
			this.selectedAppliance.push(...this.allAppliance.splice(this.allAppliance.indexOf(appliance), 1))
			this._filterRecipes()
		}
	}

	removeSelectedIngredient(ingredient) {
		if (this.selectedIngredients.indexOf(ingredient) != -1) {
			this.allIngredient.push(...this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient), 1))
			this.allIngredient.sort()
			this._filterRecipes()
		}
	}
	removeSelectedUstensil(ustensil) {
		if (this.selectedUstensils.indexOf(ustensil) != -1) {
			this.allUstensils.push(...this.selectedUstensils.splice(this.selectedUstensils.indexOf(ustensil), 1))
			this.allUstensils.sort()
			this._filterRecipes()
		}
	}
	removeSelectedAppliance(appliance) {
		if (this.selectedAppliance.indexOf(appliance) != -1) {
			this.allAppliance.push(...this.selectedAppliance.splice(this.selectedAppliance.indexOf(appliance), 1))
			this.allAppliance.sort()
			this._filterRecipes()
		}
	}

	getSelectedIngredients() {
		return this.selectedIngredients
	}
	getSelectedUstensils() {
		return this.selectedUstensils
	}
	getSelectedAppliance() {
		return this.selectedAppliance
	}

	findRecipes() {
		return []
	}

	findIngredients(value) {
		return this.allIngredient.filter((ingredient) => ingredient.toLowerCase().startsWith(value.toLowerCase()))
	}

	findAppliance(value) {
		return this.allAppliance.filter((appliance) => appliance.toLowerCase().startsWith(value.toLowerCase()))
	}

	findUstensils(value) {
		return this.allUstensils.filter((ustensil) => ustensil.toLowerCase().startsWith(value.toLowerCase()))
	}

	_filterRecipes() {
		if (this.selectedAppliance.length === 0 && this.selectedIngredients.length === 0 && this.selectedUstensils.lenght === 0)
			this.filteredRecipes = this.allRecipes.slice()
		else
		this.filteredRecipes = this.allRecipes.filter((recipe) => {
			return (
				this.selectedUstensils.every((selectedUstensil) => recipe.ustensils.includes(selectedUstensil)) &&
				this.selectedAppliance.every((selectedAppliance) => recipe.appliance === selectedAppliance) &&
				this.selectedIngredients.every((selectedIngredient) => recipe.ingredients.map((ingredient) => ingredient.ingredient).includes(selectedIngredient))
			)
		})
	}
}
