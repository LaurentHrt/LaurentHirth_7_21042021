import { recipes } from './recipes.js'

export class RecipeService {
    constructor() {
        this.allRecipes = recipes
        this.allIngredient = [
            ...new Set(
                this.allRecipes
                    .flatMap((recipe) =>
                        recipe.ingredients.map(
                            (ingredient) => ingredient.ingredient
                        )
                    )
                    .sort()
            ),
        ]
        this.allAppliance = [
            ...new Set(
                this.allRecipes.flatMap((recipe) => recipe.appliance).sort()
            ),
        ]
        this.allUstensils = [
            ...new Set(
                this.allRecipes.flatMap((recipe) => recipe.ustensils).sort()
            ),
        ]
        this.filteredRecipes = this.allRecipes.slice()
        this.filteredIngredients = this.allIngredient.slice()
        this.filteredUstensils = this.allUstensils.slice()
        this.filteredAppliance = this.allAppliance.slice()
        this.selectedIngredients = []
        this.selectedUstensils = []
        this.selectedAppliance = []
        this.recipeTextFilter = []
        this.ingredientTextFilter = ''
        this.ustensilTextFilter = ''
        this.applianceTextFilter = ''
        this.hasFilter = false
    }

    // --- Get methods
    getAllRecipes() {
        return this.allRecipes
    }

    getFilteredRecipes() {
        this.filterRecipes()
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

    getSelectedIngredients() {
        return this.selectedIngredients
    }

    getSelectedUstensils() {
        return this.selectedUstensils
    }

    getSelectedAppliance() {
        return this.selectedAppliance
    }

    getFilteredIngredients() {
        this.filterIngredient()
        return this.filteredIngredients
    }

    getFilteredAppliance() {
        this.filterAppliance()
        return this.filteredAppliance
    }

    getFilteredUstensils() {
        this.filterUstensil()
        return this.filteredUstensils
    }

    // --- Add & Remove methods
    addSelectedIngredient(ingredient) {
        this.selectedIngredients.push(
            this.filteredIngredients[
                this.filteredIngredients.indexOf(ingredient)
            ]
        )
    }

    addSelectedUstensil(ustensil) {
        this.selectedUstensils.push(
            this.filteredUstensils[this.filteredUstensils.indexOf(ustensil)]
        )
    }

    addSelectedAppliance(appliance) {
        this.selectedAppliance.push(
            this.filteredAppliance[this.filteredAppliance.indexOf(appliance)]
        )
    }

    removeSelectedIngredient(ingredient) {
        this.selectedIngredients.splice(
            this.selectedIngredients.indexOf(ingredient),
            1
        )
    }

    removeSelectedUstensil(ustensil) {
        this.selectedUstensils.splice(
            this.selectedUstensils.indexOf(ustensil),
            1
        )
    }

    removeSelectedAppliance(appliance) {
        this.selectedAppliance.splice(
            this.selectedAppliance.indexOf(appliance),
            1
        )
    }

    addRecipeTextFilter(textFilter) {
        this.recipeTextFilter = textFilter.toLowerCase().split(' ')
    }

    removeRecipeTextFilter() {
        this.recipeTextFilter.length = 0
    }

    addIngredientTextFilter(textFilter) {
        this.ingredientTextFilter = textFilter.toLowerCase()
    }

    removeIngredientTextFilter() {
        this.ingredientTextFilter = ''
    }

    addUstensilTextFilter(textFilter) {
        this.ustensilTextFilter = textFilter.toLowerCase()
    }

    removeUstensilTextFilter() {
        this.ustensilTextFilter = ''
    }

    addApplianceTextFilter(textFilter) {
        this.applianceTextFilter = textFilter.toLowerCase()
    }

    removeApplianceTextFilter() {
        this.applianceTextFilter = ''
    }

    // --- Filtering Methods
    filterRecipes() {
        this.filteredRecipes = this.allRecipes.filter((recipe) => {
            return (
                // filter recipes by selected ustensil, ingredient and appliance
                this.selectedUstensils.every((selectedUstensil) =>
                    recipe.ustensils.includes(selectedUstensil)
                ) &&
                this.selectedAppliance.every(
                    (selectedAppliance) =>
                        recipe.appliance === selectedAppliance
                ) &&
                this.selectedIngredients.every((selectedIngredient) =>
                    recipe.ingredients
                        .map((ingredient) => ingredient.ingredient)
                        .includes(selectedIngredient)
                ) &&
                // filter recipes by text
                this.recipeTextFilter.every(
                    (word) =>
                        recipe.description.toLowerCase().includes(word) ||
                        recipe.name.toLowerCase().includes(word) ||
                        recipe.ingredients
                            .map((ingredient) => ingredient.ingredient)
                            .join('')
                            .toLowerCase()
                            .includes(word)
                )
            )
        })

        this.filterIngredient()
        this.filterUstensil()
        this.filterAppliance()
    }

    filterIngredient() {
        // Get ingredient from filtered recipes
        this.filteredIngredients = [
            ...new Set(
                this.filteredRecipes
                    .flatMap((recipe) =>
                        recipe.ingredients.map(
                            (ingredient) => ingredient.ingredient
                        )
                    )
                    .sort()
            ),
        ]

        // Remove selected ingredient and apply the text filter
        this.filteredIngredients = this.filteredIngredients.filter(
            (ingredient) => {
                return (
                    ingredient
                        .toLowerCase()
                        .includes(this.ingredientTextFilter) &&
                    !this.selectedIngredients.includes(ingredient)
                )
            }
        )
    }

    filterUstensil() {
        // Get ustensil from filtered recipes
        this.filteredUstensils = [
            ...new Set(
                this.filteredRecipes
                    .flatMap((recipe) => recipe.ustensils)
                    .sort()
            ),
        ]

        // Remove selected ustensil and apply the text filter
        this.filteredUstensils = this.filteredUstensils.filter((ustensil) => {
            return (
                ustensil.toLowerCase().includes(this.ustensilTextFilter) &&
                !this.selectedUstensils.includes(ustensil)
            )
        })
    }

    filterAppliance() {
        // Get appliance from filtered recipes
        this.filteredAppliance = [
            ...new Set(
                this.filteredRecipes
                    .flatMap((recipe) => recipe.appliance)
                    .sort()
            ),
        ]

        // Remove selected appliance and apply the text filter
        this.filteredAppliance = this.filteredAppliance.filter((appliance) => {
            return (
                appliance.toLowerCase().includes(this.applianceTextFilter) &&
                !this.selectedAppliance.includes(appliance)
            )
        })
    }
}
