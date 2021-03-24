import { recipes } from './recipes.js'

export class RecipeService {

	getAllRecipes() {
		return recipes
	}

	getAllIngredients() {
		return new Set(recipes.map(recipe=>recipe.ingredients.map(ingredient=>ingredient.ingredient)).flat().sort())
	}

	getAllAppliance() {
		return new Set(recipes.map(recipe=>recipe.appliance).sort())
	}

	getAllUstensils() {
		return new Set(recipes.map(recipe=>recipe.ustensils).flat().sort())
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
