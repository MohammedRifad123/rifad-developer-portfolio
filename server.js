const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());
// Serve static files from the root directory so index.html works natively
app.use(express.static(__dirname)); 

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// POST endpoint to save a new message
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = {
        id: Date.now().toString(),
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        const messages = JSON.parse(data);
        messages.push(newMessage);
        fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2));
        res.status(201).json({ success: true, message: "Your message has been sent securely!" });
    } catch (error) {
        console.error("Error writing to database:", error);
        res.status(500).json({ error: "Failed to save message." });
    }
});

// GET endpoint to retrieve all messages for the admin panel
app.get('/api/messages', (req, res) => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        // Return latest messages first
        const messages = JSON.parse(data).reverse(); 
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error reading database:", error);
        res.status(500).json({ error: "Failed to retrieve messages." });
    }
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Admin page available at http://localhost:${PORT}/admin.html`);
    console.log(`=========================================`);
});
