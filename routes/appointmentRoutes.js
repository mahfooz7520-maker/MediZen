const express = require("express");

const router = express.Router();

const appointmentController =
    require("../controllers/appointmentController");


// GET all
router.get(
    "/",
    appointmentController.getAppointments
);


// GET by ID
router.get(
    "/:id",
    appointmentController.getAppointment
);


// CREATE
router.post(
    "/",
    appointmentController.createAppointment
);


// UPDATE
router.put(
    "/:id",
    appointmentController.updateAppointment
);


// DELETE
router.delete(
    "/:id",
    appointmentController.deleteAppointment
);


module.exports = router;