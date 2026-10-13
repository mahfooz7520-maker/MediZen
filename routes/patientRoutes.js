const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

// ============================
// GET ALL PATIENTS
// GET /api/patients
// ============================
router.get("/", patientController.getPatients);

// ============================
// CREATE PATIENT PROFILE
// POST /api/patients/profile
// ============================
router.post("/profile", patientController.createPatient);

// ============================
// GET PATIENT BY ID
// GET /api/patients/:id
// ============================
router.get("/:id", patientController.getPatient);

// ============================
// CREATE PATIENT
// POST /api/patients
// ============================
router.post("/", patientController.createPatient);

// ============================
// UPDATE PATIENT
// PUT /api/patients/:id
// ============================
router.put("/:id", patientController.updatePatient);

// ============================
// DELETE PATIENT
// DELETE /api/patients/:id
// ============================
router.delete("/:id", patientController.deletePatient);

module.exports = router;
