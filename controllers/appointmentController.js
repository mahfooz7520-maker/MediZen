const appointmentModel =
    require("../models/appointmentModel");


// =========================
// GET ALL
// =========================

exports.getAppointments = (req, res) => {

    appointmentModel.getAllAppointments(
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch appointments",
                    error: err.message
                });

            }


            res.json({
                success: true,
                data: result
            });

        }
    );

};


// =========================
// GET BY ID
// =========================

exports.getAppointment = (req, res) => {

    const id = req.params.id;

    appointmentModel.getAppointmentById(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch appointment",
                    error: err.message
                });

            }


            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });

            }


            res.json({
                success: true,
                data: result[0]
            });

        }
    );

};


// =========================
// CREATE
// =========================

exports.createAppointment = (req, res) => {

    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
        status
    } = req.body;


    if (
        !patient_id ||
        !doctor_id ||
        !appointment_date ||
        !appointment_time
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Patient, doctor, date and time are required"
        });

    }


    appointmentModel.createAppointment(
        {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason,
            status
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to create appointment",
                    error: err.message
                });

            }


            res.status(201).json({
                success: true,
                message: "Appointment created successfully",
                appointmentId: result.insertId
            });

        }
    );

};


// =========================
// UPDATE
// =========================

exports.updateAppointment = (req, res) => {

    const id = req.params.id;

    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
        status
    } = req.body;


    appointmentModel.updateAppointment(
        id,
        {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason,
            status
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to update appointment",
                    error: err.message
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });

            }


            res.json({
                success: true,
                message: "Appointment updated successfully"
            });

        }
    );

};


// =========================
// DELETE
// =========================

exports.deleteAppointment = (req, res) => {

    const id = req.params.id;


    appointmentModel.deleteAppointment(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to delete appointment",
                    error: err.message
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment not found"
                });

            }


            res.json({
                success: true,
                message: "Appointment deleted successfully"
            });

        }
    );

};