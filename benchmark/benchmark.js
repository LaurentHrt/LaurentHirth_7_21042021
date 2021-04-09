let allRecipes = [] // Insert allRecipes here
let filteredRecipes = []
let recipeTextFilter = ['coco', 'citron']

for (const recipe of allRecipes) {
    let match = true

    for (const word of recipeTextFilter) {
        if (
            !recipe.description.toLowerCase().includes(word) &&
            !recipe.name.toLowerCase().includes(word)
        )
            match = false
    }

    if (match) filteredRecipes.push(recipe)
}
