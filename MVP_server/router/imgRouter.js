const mongoose = require("mongoose");
const router = require("express").Router();
const ImgController = require("../controllers/imgController");

router.get("/", ImgController.getAllImg);
router.post("/", ImgController.postOneImg);
router.delete("/:id", ImgController.deleteImg);
router.put("/:id", ImgController.updateImg);
router.get("/:userId", ImgController.getAllUserImg);

module.exports = router; // bunun ismini değişme özel bu

// const mongoose = require("mongoose");
// const router = require("express").Router();
// const imgController = require("../controllers/imgController.js");

// router.get("/", imgController.getAllImg);
// router.post("/uploads", imgController.postOneImg);
// // router.delete("/:id", imgController.deleteImg);
// // router.put("/:id", imgController.updateImg);
// // router.get("/:userId", imgController.getAllUserImg);
// module.exports = router; // bunun ismini değişme özel bu
