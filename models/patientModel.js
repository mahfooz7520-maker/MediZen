const db = require("../config/db");


// Get all patients
const getAllPatients = (callback) => {

    db.query(
        "SELECT * FROM patients ORDER BY id DESC",
        callback
    );

};


// Get patient by ID
const getPatientById = (id, callback) => {

    db.query(
        "SELECT * FROM patients WHERE id = ?",
        [id],
        callback
    );

};


// Create patient
const createPatient = (data, callback) => {

    const sql = `
        INSERT INTO patients
        (name, email, phone, gender, age, address)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone,
            data.gender,
            data.age,
            data.address
        ],
        callback
    );

};


// Update patient
const updatePatient = (id, data, callback) => {

    const sql = `
        UPDATE patients
        SET
            name = ?,
            email = ?,
            phone = ?,
            gender = ?,
            age = ?,
            address = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone,
            data.gender,
            data.age,
            data.address,
            id
        ],
        callback
    );

};


// Delete patient
const deletePatient = (id, callback) => {

    db.query(
        "DELETE FROM patients WHERE id = ?",
        [id],
        callback
    );

};


module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};