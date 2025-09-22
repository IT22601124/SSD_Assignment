const express = require("express");
const {
  createfeedbackDetail,
  getfeedbackDetails,
  getfeedbackDetail,
  deletefeedbackDetail,
  updatefeedbackDetail,
  getUserSpecificFeedbacks
} = require("../controllers/feedbackController");

const router = express.Router();

//GET all feedbacks
router.get("/", getfeedbackDetails);

//GET a single feedbacks
router.get("/:id", getfeedbackDetail);

//GET User specific feedbacks
router.get("/user/:id", getUserSpecificFeedbacks);

//POST a new feedback
router.post("/add-feedback", createfeedbackDetail);

//DELETE a new feedback
router.delete("/:id", deletefeedbackDetail);

//UPDATE a new feedback
router.patch("/:id", updatefeedbackDetail);
module.exports = router;
