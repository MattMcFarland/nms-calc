const plants = require('../../data/plants')

module.exports = (name) => plants.find((item) => item.harvest === name)
