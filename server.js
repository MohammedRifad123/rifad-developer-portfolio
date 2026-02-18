const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* EMAIL TRANSPORT */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD   // Gmail App Password
    }
});

/* CONTACT ROUTE */
app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,   // must be your email
        replyTo: email,            // user's email goes here
        to: process.env.EMAIL,
        subject: `Portfolio Contact: ${subject}`,
        html: `
            <h3>New Message from Portfolio</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message Sent Successfully ✅" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error Sending Message ❌" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
ResizeObserver