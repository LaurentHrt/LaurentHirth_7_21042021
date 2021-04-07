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
        this.filteredRecipes = recipes
        this.filteredIngredients = this.allIngredient.slice()
        this.filteredUstensils = this.allUstensils.slice()
        this.filteredAppliance = this.allAppliance.slice()
        this.selectedIngredients = []
        this.selectedUstensils = []
        this.selectedAppliance = []
        this.recipeTextFilter = ''
        this.ingredientTextFilter = ''
        this.ustensilTextFilter = ''
        this.applianceTextFilter = ''
        this.hasFilter = false
    }

    _updateHasFilter() {
        if (
            this.selectedAppliance.length === 0 &&
            this.selectedIngredients.length === 0 &&
            this.selectedUstensils.lenght === 0 &&
            this.recipeTextFilter === ''
        )
            this.hasFilter = false
        else this.hasFilter = true
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
        if (this.filteredIngredients.indexOf(ingredient) != -1) {
            this.selectedIngredients.push(
                ...this.filteredIngredients.splice(
                    this.filteredIngredients.indexOf(ingredient),
                    1
                )
            )
        }
        this._updateHasFilter()
    }

    addSelectedUstensil(ustensil) {
        if (this.filteredUstensils.indexOf(ustensil) != -1) {
            this.selectedUstensils.push(
                ...this.filteredUstensils.splice(
                    this.filteredUstensils.indexOf(ustensil),
                    1
                )
            )
        }
        this._updateHasFilter()
    }

    addSelectedAppliance(appliance) {
        if (this.filteredAppliance.indexOf(appliance) != -1) {
            this.selectedAppliance.push(
                ...this.filteredAppliance.splice(
                    this.filteredAppliance.indexOf(appliance),
                    1
                )
            )
        }
        this._updateHasFilter()
    }

    removeSelectedIngredient(ingredient) {
        if (this.selectedIngredients.indexOf(ingredient) != -1) {
            this.filteredIngredients.push(
                ...this.selectedIngredients.splice(
                    this.selectedIngredients.indexOf(ingredient),
                    1
                )
            )
            this.filteredIngredients.sort()
        }
        this._updateHasFilter()
    }

    removeSelectedUstensil(ustensil) {
        if (this.selectedUstensils.indexOf(ustensil) != -1) {
            this.filteredUstensils.push(
                ...this.selectedUstensils.splice(
                    this.selectedUstensils.indexOf(ustensil),
                    1
                )
            )
            this.filteredUstensils.sort()
        }
        this._updateHasFilter()
    }

    removeSelectedAppliance(appliance) {
        if (this.selectedAppliance.indexOf(appliance) != -1) {
            this.filteredAppliance.push(
                ...this.selectedAppliance.splice(
                    this.selectedAppliance.indexOf(appliance),
                    1
                )
            )
            this.filteredAppliance.sort()
        }
        this._updateHasFilter()
    }

    addRecipeTextFilter(textFilter) {
        this.recipeTextFilter = textFilter.toLowerCase()
        this._updateHasFilter()
    }

    removeRecipeTextFilter() {
        this.recipeTextFilter = ''
        this._updateHasFilter()
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
        // If no filter, filteredRecipes = allRecipes
        if (!this.hasFilter) {
            this.filteredRecipes = this.allRecipes.slice()
            return
        }

        // filter recipes by selected ustensil, ingredient and appliance
        this.filteredRecipes = this.allRecipes.filter((recipe) => {
            return (
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
                )
            )
        })

        // filter recipes by text
        this.filteredRecipes = this.filteredRecipes.filter((recipe) => {
            return (
                recipe.description
                    .toLowerCase()
                    .includes(this.recipeTextFilter) ||
                recipe.name.toLowerCase().includes(this.recipeTextFilter) ||
                recipe.ingredients
                    .map((ingredient) => ingredient.ingredient)
                    .join('')
                    .toLowerCase()
                    .includes(this.recipeTextFilter)
            )
        })

        this.filterIngredient()
        this.filterUstensil()
        this.filterAppliance()
    }

    filterIngredient() {
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
        if (this.ingredientTextFilter === '') {
            this.filteredIngredients = this.filteredIngredients.filter(
                (ingredient) => !this.selectedIngredients.includes(ingredient)
            )
            return
        }
        this.filteredIngredients = this.filteredIngredients.filter(
            (ingredient) =>
                ingredient.toLowerCase().includes(this.ingredientTextFilter)
        )
    }

    filterUstensil() {
        this.filteredUstensils = [
            ...new Set(
                this.filteredRecipes
                    .flatMap((recipe) => recipe.ustensils)
                    .sort()
            ),
        ]
        if (this.ustensilTextFilter === '') {
            this.filteredUstensils = this.filteredUstensils.filter(
                (ustensil) => !this.selectedUstensils.includes(ustensil)
            )
            return
        }
        this.filteredUstensils = this.filteredUstensils.filter((ustensil) =>
            ustensil.toLowerCase().includes(this.ustensilTextFilter)
        )
    }

    filterAppliance() {
        this.filteredAppliance = [
            ...new Set(
                this.filteredRecipes
                    .flatMap((recipe) => recipe.appliance)
                    .sort()
            ),
        ]
        if (this.applianceTextFilter === '') {
            this.filteredAppliance = this.filteredAppliance.filter(
                (appliance) => !this.selectedAppliance.includes(appliance)
            )
            return
        }
        this.filteredAppliance = this.filteredAppliance.filter((appliance) =>
            appliance.toLowerCase().includes(this.applianceTextFilter)
        )
    }
}
