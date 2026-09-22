const express = require("express");

const router = express.Router();

const doctorController =
    require("../controllers/doctorController");


// GET all doctors
router.get("/", doctorController.getDoctors);


// GET doctor
router.get("/:id", doctorController.getDoctor);


// CREATE doctor
router.post("/", doctorController.createDoctor);


// UPDATE doctor
router.put("/:id", doctorController.updateDoctor);


// DELETE doctor
router.delete("/:id", doctorController.deleteDoctor);


module.exports = router;