let allRecipes = [] // Insert allRecipes here
let filteredRecipes = []

let recipeTextFilter = ['citron']
// let recipeTextFilter = ['coco', 'citron']
// let recipeTextFilter = ['citron', 'coco', 'couteau', 'poisson', 'verre', 'ananas']

for (const recipe of allRecipes) {
    let match = true
    const ingredientList = []

    for (const ingredient of recipe.ingredients) {
        ingredientList.push(ingredient.ingredient)
    }

    for (const word of recipeTextFilter) {
        if (
            !recipe.description.toLowerCase().includes(word) &&
            !recipe.name.toLowerCase().includes(word) &&
            !ingredientList.join(' ').includes(word)
        )
            match = false
    }

    if (match) filteredRecipes.push(recipe)
}