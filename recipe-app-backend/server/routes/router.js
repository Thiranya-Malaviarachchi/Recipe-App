const express = require("express");
const route = express.Router();

const contoller = require("../controller/controller");

//Recipe Details APIs

route.post(
  "/api/prevProRound-details/",
  contoller.previousProductionRoundDetails.create
);
route.get(
  "/api/prevProRound-details/",
  contoller.previousProductionRoundDetails.find
);
route.put(
  "/api/prevProRound-details/",
  contoller.previousProductionRoundDetails.update
);
route.delete(
  "/api/prevProRound-details/",
  contoller.previousProductionRoundDetails.delete
);


module.exports = route;
