const {
  addFeedback,
  findAllFeedbacks,
  findFeedbackById,
  deleteFeedbackById,
  updateFeedbackById,
} = require("../controllers/feedback.controller");

const router = require("express").Router();

router.post("/create", addFeedback);
router.get("/all", findAllFeedbacks);
router.get("/:id", findFeedbackById);
router.delete("/:id", deleteFeedbackById);
router.put("/:id", updateFeedbackById);

module.exports = router;
