const db = require("../config/db");


// Get all appointments
const getAllAppointments = (callback) => {

    const sql = `
        SELECT
            appointments.*,
            patients.name AS patient_name,
            doctors.name AS doctor_name,
            doctors.specialization
        FROM appointments

        INNER JOIN patients
            ON appointments.patient_id = patients.id

        INNER JOIN doctors
            ON appointments.doctor_id = doctors.id

        ORDER BY appointments.id DESC
    `;

    db.query(sql, callback);

};


// Get appointment by ID
const getAppointmentById = (id, callback) => {

    const sql = `
        SELECT
            appointments.*,
            patients.name AS patient_name,
            doctors.name AS doctor_name
        FROM appointments

        INNER JOIN patients
            ON appointments.patient_id = patients.id

        INNER JOIN doctors
            ON appointments.doctor_id = doctors.id

        WHERE appointments.id = ?
    `;

    db.query(sql, [id], callback);

};


// Create appointment
const createAppointment = (data, callback) => {

    const sql = `
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.patient_id,
            data.doctor_id,
            data.appointment_date,
            data.appointment_time,
            data.reason,
            data.status || "Pending"
        ],
        callback
    );

};


// Update appointment
const updateAppointment = (id, data, callback) => {

    const sql = `
        UPDATE appointments
        SET
            patient_id = ?,
            doctor_id = ?,
            appointment_date = ?,
            appointment_time = ?,
            reason = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            data.patient_id,
            data.doctor_id,
            data.appointment_date,
            data.appointment_time,
            data.reason,
            data.status,
            id
        ],
        callback
    );

};


// Delete appointment
const deleteAppointment = (id, callback) => {

    db.query(
        "DELETE FROM appointments WHERE id = ?",
        [id],
        callback
    );

};


module.exports = {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};