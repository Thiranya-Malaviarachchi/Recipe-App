//import the modal
var recipeDetails = require("../model/recipeDetails.model");

// create and save recipe details
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: req.body });
    return;
  }

  // recipe details

  //creant an object from the model
  const recipeDet = new recipeDetails({
    //get the frontend values as a request through the request body
    recipeId: req.body.recipeId,
    recipeName: req.body.recipeName,
    ingredients: req.body.ingredients,
    description: req.body.description,
  });

  // save recipe details to the database through the modal
  recipeDet
    .save(recipeDet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error: Could Not Add Recipe Details.",
      });
    });
};
//retrive and return all recipe details/retrieve a single recipe details
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    recipeDetails
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message:
              "Could Not Find Recipe  Details With ID" + id,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            "Error While Retrieving Recipe  Details With ID" +
            id,
        });
      });
  } else {
    recipeDetails
      .find()
      .then((matCode) => {
        res.send(matCode);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Error: Cannot Retrieve Recipe  Details",
        });
      });
  }
};

//update a recipe details
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data To Be Update Can Not Be Empty" });
  }

  const id = req.body.id;
  recipeDetails
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "Recipe  Details Is Not Found" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error while Updateting Details" });
    });
};

//Delete a recipe details  with specified recipe details id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  recipeDetails
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Can Not Delete Recipe  Details With $(id).`,
        });
      } else {
        res.send({ message: "Recipe  Details Was Deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error While Deleting." });
    });
};
