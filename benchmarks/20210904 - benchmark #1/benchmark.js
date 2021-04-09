let allRecipes = [] // Insert all recipes here
let filteredRecipes = []

let recipeTextFilter = ['citron']
// let recipeTextFilter = ['coco', 'citron']
// let recipeTextFilter = ['citron', 'coco', 'couteau', 'poisson', 'verre', 'ananas']

filteredRecipes = allRecipes.filter((recipe) => {
    return recipeTextFilter.every(
        (word) =>
            recipe.description.toLowerCase().includes(word) ||
            recipe.name.toLowerCase().includes(word) ||
            recipe.ingredients
                .map((ingredient) => ingredient.ingredient)
                .join(' ')
                .toLowerCase()
                .includes(word)
    )
})
