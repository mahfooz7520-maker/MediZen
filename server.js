const express = require("express");
require("dotenv").config();

const cors = require("cors");

const db = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Home
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "MediZen Backend is Running"
    });

});


// Database Test
app.get("/db-test", (req, res) => {

    const sql = "SELECT 1 AS test";

    db.query(sql, (err, result) => {

        if (err) {

            console.error("DB QUERY ERROR:");
            console.error("Code:", err.code);
            console.error("Message:", err.message);

            return res.status(500).json({
                success: false,
                message: "Database query failed",
                error: err.message,
                code: err.code
            });
        }

        res.json({
            success: true,
            message: "Database connected successfully",
            result: result
        });

    });

});


// ============================
// API Routes
// ============================

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);


// ============================
// 404
// ============================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl
    });

});


// ============================
// Server
// ============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("--------------------------------");
    console.log("MediZen Backend");
    console.log(`Server running on port ${PORT}`);
    console.log("--------------------------------");

});