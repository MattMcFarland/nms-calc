const plants = require ('../data/plants')
const crafts = require('../data/crafts')
const select = require('./utils/select')
const fromPlant = require('./utils/plant')

const selectFromAll = select(...[crafts, plants])

// why not just scrape the wiki, grab relevent info, and populate the data that way.

// scrape scraape scraape

function getCraftingRecipe (name, needed = 1) {
  const item = selectFromAll(name)
  if (!item) return name;
  if (!item.ingredients) return item
  const result = {
    name: item.name,
    amount: item.amount,
    needed: needed,
    tip: ''
  }
  result.ingredients = item.ingredients.map((ingredient, index) => {
    const totalNeeded = ingredient.amount * needed
    if (fromPlant(ingredient.name)) {
      const plant = fromPlant(ingredient.name)
      result.tip += buildTip('Plant', `${totalNeeded / plant.yield} ${plant.name}(s)`, index, item.ingredients.length)
      return {
        name: ingredient.name,
        amount: totalNeeded,
        plant: {
          name: plant.name,
          needed: totalNeeded / plant.yield
        }
      }
    } else {
      result.tip += buildTip('Craft', `${totalNeeded} ${ingredient.name}`, index, item.ingredients.length)
      return {
        name: ingredient.name,
        amount: ingredient.amount * needed,
        ...getCraftingRecipe(ingredient.name, ingredient.amount * needed)
      }      
    }
  })
  return result
}

function buildTip (verb, instruction, index, length) {
  if (index !== 0) verb = verb.toLowerCase()
  switch (index) {
    case length - 1:
      return `${verb} ${instruction}.`
    case length - 2:
      return `${verb} ${instruction}, and `
    default:
      return `${verb} ${instruction}, `
  }
}

const instruction = getCraftingRecipe('Circuit Board', 1)
console.log(instruction)

