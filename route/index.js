const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.use("/posts", verifyJWT, require("./post"));
router.use("/auth", require("./auth"));
router.use("/clinics", require("./clinic"));
router.use("/shifts", require("./shift"));
router.use("/profile", require("./profile"));
router.use("/tsm", require("./tsm"));
router.use("/dcp", require("./dcp"));
router.use("/admin", require("./admin"));
router.use("/nots", require("./notification"));

module.exports = router;
