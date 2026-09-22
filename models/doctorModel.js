const db = require("../config/db");


// Get all doctors
const getAllDoctors = (callback) => {

    db.query(
        "SELECT * FROM doctors ORDER BY id DESC",
        callback
    );

};


// Get doctor by ID
const getDoctorById = (id, callback) => {

    db.query(
        "SELECT * FROM doctors WHERE id = ?",
        [id],
        callback
    );

};


// Create doctor
const createDoctor = (data, callback) => {

    const sql = `
        INSERT INTO doctors
        (
            name,
            email,
            phone,
            specialization,
            experience,
            qualification
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone,
            data.specialization,
            data.experience,
            data.qualification
        ],
        callback
    );

};


// Update doctor
const updateDoctor = (id, data, callback) => {

    const sql = `
        UPDATE doctors
        SET
            name = ?,
            email = ?,
            phone = ?,
            specialization = ?,
            experience = ?,
            qualification = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone,
            data.specialization,
            data.experience,
            data.qualification,
            id
        ],
        callback
    );

};


// Delete doctor
const deleteDoctor = (id, callback) => {

    db.query(
        "DELETE FROM doctors WHERE id = ?",
        [id],
        callback
    );

};


module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};