const db = require("../config/db");


// Get all patients
const getAllPatients = (callback) => {

    db.query(
        "SELECT *, Alletgies AS Allergies, chronic_conditions AS Chronic_Conditions, Blood_Group AS Blood_group FROM patients ORDER BY id DESC",
        callback
    );

};


// Get patient by ID
const getPatientById = (id, callback) => {

    db.query(
        "SELECT *, Alletgies AS Allergies, chronic_conditions AS Chronic_Conditions, Blood_Group AS Blood_group FROM patients WHERE id = ?",
        [id],
        callback
    );

};


// Create patient
const createPatient = (data, callback) => {

    const sql = `
        INSERT INTO patients
        (name, email, phone, gender, age, address, Height, Weight, Alletgies, chronic_conditions, Blood_Group)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone ?? null,
            data.gender ?? null,
            data.age ?? null,
            data.address ?? null,
            data.height ?? null,
            data.weight ?? null,
            data.allergies ?? null,
            data.chronicConditions ?? null,
            data.bloodGroup ?? null
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
            address = ?,
            Height = ?,
            Weight = ?,
            Alletgies = ?,
            chronic_conditions = ?,
            Blood_Group = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            data.name,
            data.email,
            data.phone ?? null,
            data.gender ?? null,
            data.age ?? null,
            data.address ?? null,
            data.height ?? null,
            data.weight ?? null,
            data.allergies ?? null,
            data.chronicConditions ?? null,
            data.bloodGroup ?? null,
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