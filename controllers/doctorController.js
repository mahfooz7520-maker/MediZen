const doctorModel = require("../models/doctorModel");


// GET ALL
exports.getDoctors = (req, res) => {

    doctorModel.getAllDoctors((err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch doctors",
                error: err.message
            });

        }

        res.json({
            success: true,
            data: result
        });

    });

};


// GET BY ID
exports.getDoctor = (req, res) => {

    const id = req.params.id;

    doctorModel.getDoctorById(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch doctor",
                error: err.message
            });

        }


        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });

        }


        res.json({
            success: true,
            data: result[0]
        });

    });

};


// CREATE
exports.createDoctor = (req, res) => {

    const {
        name,
        email,
        phone,
        specialization,
        experience,
        qualification
    } = req.body;


    if (!name || !email || !specialization) {

        return res.status(400).json({
            success: false,
            message: "Name, email and specialization are required"
        });

    }


    doctorModel.createDoctor(
        {
            name,
            email,
            phone,
            specialization,
            experience,
            qualification
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to create doctor",
                    error: err.message
                });

            }


            res.status(201).json({
                success: true,
                message: "Doctor created successfully",
                doctorId: result.insertId
            });

        }
    );

};


// UPDATE
exports.updateDoctor = (req, res) => {

    const id = req.params.id;

    const {
        name,
        email,
        phone,
        specialization,
        experience,
        qualification
    } = req.body;


    doctorModel.updateDoctor(
        id,
        {
            name,
            email,
            phone,
            specialization,
            experience,
            qualification
        },
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to update doctor",
                    error: err.message
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                });

            }


            res.json({
                success: true,
                message: "Doctor updated successfully"
            });

        }
    );

};


// DELETE
exports.deleteDoctor = (req, res) => {

    const id = req.params.id;

    doctorModel.deleteDoctor(id, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to delete doctor",
                error: err.message
            });

        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });

        }


        res.json({
            success: true,
            message: "Doctor deleted successfully"
        });

    });

};