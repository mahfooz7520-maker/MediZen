const db = require("../config/db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// =========================
// REGISTER
// =========================

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });

        }


        // Check existing user

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: "Database error",
                        error: err.message
                    });

                }


                if (result.length > 0) {

                    return res.status(409).json({
                        success: false,
                        message: "Email already registered"
                    });

                }


                // Hash password

                const hashedPassword =
                    await bcrypt.hash(password, 10);


                const sql = `
                    INSERT INTO users
                    (name, email, password, role)
                    VALUES (?, ?, ?, ?)
                `;


                db.query(
                    sql,
                    [
                        name,
                        email,
                        hashedPassword,
                        role || "patient"
                    ],
                    (err, result) => {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message:
                                    "Failed to register user",
                                error: err.message
                            });

                        }


                        res.status(201).json({
                            success: true,
                            message:
                                "User registered successfully",
                            userId: result.insertId
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }

};


// =========================
// LOGIN
// =========================

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });

    }


    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }


            if (result.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });

            }


            const user = result[0];


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });

            }


            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );


            res.json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        }
    );

};