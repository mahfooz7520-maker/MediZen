const patientModel = require("../models/patientModel");


// ===========================
// GET ALL PATIENTS
// ===========================

exports.getPatients = (req, res) => {

    patientModel.getAllPatients((err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch patients",
                error: err.message
            });

        }

        res.json({
            success: true,
            data: result
        });

    });

};


// ===========================
// GET PATIENT BY ID
// ===========================

exports.getPatient = (req, res) => {

    const id = req.params.id;

    patientModel.getPatientById(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch patient",
                error: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });

        }

        res.json({
            success: true,
            data: result[0]
        });

    });

};


// ===========================
// CREATE PATIENT
// ===========================

exports.createPatient = (req, res) => {

    const {
        name,
        email,
        phone,
        gender,
        age,
        address
    } = req.body;


    if (!name || !email) {

        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });

    }


    const data = {
        name,
        email,
        phone,
        gender,
        age,
        address
    };


    patientModel.createPatient(data, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to create patient",
                error: err.message
            });

        }


        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            patientId: result.insertId
        });

    });

};


// ===========================
// UPDATE PATIENT
// ===========================

exports.updatePatient = (req, res) => {

    const id = req.params.id;

    const {
        name,
        email,
        phone,
        gender,
        age,
        address
    } = req.body;


    patientModel.updatePatient(
        id,
        {
            name,
            email,
            phone,
            gender,
            age,
            address
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to update patient",
                    error: err.message
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Patient not found"
                });

            }


            res.json({
                success: true,
                message: "Patient updated successfully"
            });

        }
    );

};


// ===========================
// DELETE PATIENT
// ===========================

exports.deletePatient = (req, res) => {

    const id = req.params.id;


    patientModel.deletePatient(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to delete patient",
                error: err.message
            });

        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });

        }


        res.json({
            success: true,
            message: "Patient deleted successfully"
        });

    });

};