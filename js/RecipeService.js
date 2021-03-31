import { recipes } from './recipes.js'

export class RecipeService {
	constructor() {
		this.allRecipes = recipes
		this.allIngredient = [...new Set(this.allRecipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient)).sort())]
		this.allAppliance = [...new Set(this.allRecipes.map((recipe) => recipe.appliance).sort())]
		this.allUstensils = [...new Set(this.allRecipes.flatMap((recipe) => recipe.ustensils).sort())]
		this.selectedIngredients = []
		this.selectedUstensils = []
		this.selectedAppliance = []
	}

	getAllRecipes() {
		return this.allRecipes
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
		if (this.allIngredient.indexOf(ingredient) != -1) this.selectedIngredients.push(this.allIngredient.splice(this.allIngredient.indexOf(ingredient), 1))
	}
	addSelectedUstensil(ustensil) {
		if (this.allUstensils.indexOf(ustensil) != -1) this.selectedUstensils.push(this.allUstensils.splice(this.allUstensils.indexOf(ustensil), 1))
	}
	addSelectedAppliance(appliance) {
		if (this.allAppliance.indexOf(appliance) != -1) this.selectedAppliance.push(this.allAppliance.splice(this.allAppliance.indexOf(appliance), 1))
	}

	removeSelectedIngredient(ingredient) {
		if (this.selectedIngredients.indexOf(ingredient) != -1) {
			this.allIngredient.push(this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient), 1))
			this.allIngredient.sort()
		}
	}
	removeSelectedUstensil(ustensil) {
		if (this.selectedUstensils.indexOf(ustensil) != -1) {
			this.allUstensils.push(this.selectedUstensils.splice(this.selectedUstensils.indexOf(ustensil), 1))
			this.allUstensils.sort()
		}
	}
	removeSelectedAppliance(appliance) {
		if (this.selectedAppliance.indexOf(appliance) != -1) {
			this.allAppliance.push(this.selectedAppliance.splice(this.selectedAppliance.indexOf(appliance), 1))
			this.allAppliance.sort()
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

	findIngredients() {
		return []
	}

	findAppliance() {
		return []
	}

	findUstenstils() {
		return []
	}
}
