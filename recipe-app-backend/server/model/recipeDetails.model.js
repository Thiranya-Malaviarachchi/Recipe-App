//import the mongoose package and assign to a variable
const mongoose = require("mongoose");

//create the schema to define the attirbutes
var schema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },

  recipeName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//create the document to catch the values pass from the controller pass to the document
const recipeDetails = mongoose.model(
  "recipeDetails",
  schema
);

module.exports = recipeDetails;
