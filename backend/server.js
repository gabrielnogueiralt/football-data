const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("CREATE TABLE favorites (user_id INTEGER, team_id INTEGER)");
});

// User authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).send({ error: 'Invalid credentials' });
        } else {
            res.send({ userId: user.id });
        }
    });
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function (err) {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ userId: this.lastID });
        }
    });
});

// Middleware to verify user ID
const verifyUser = (req, res, next) => {
    const userId = req.headers['userid'];
    if (!userId) return res.status(403).send({ auth: false, message: 'No user ID provided.' });

    db.get("SELECT id FROM users WHERE id = ?", [userId], (err, user) => {
        if (err || !user) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate user.' });
        }
        req.userId = userId;
        next();
    });
};

// Save favorite team
app.post('/favorites', verifyUser, (req, res) => {
    const { teamId } = req.body;
    db.run("INSERT INTO favorites (user_id, team_id) VALUES (?, ?)", [req.userId, teamId], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ success: true });
        }
    });
});

// Remove favorite team
app.delete('/favorites/:teamId', verifyUser, (req, res) => {
    db.run("DELETE FROM favorites WHERE user_id = ? AND team_id = ?", [req.userId, req.params.teamId], (err) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send({ success: true });
        }
    });
});

// Get favorite teams
app.get('/favorites', verifyUser, (req, res) => {
    db.all("SELECT team_id FROM favorites WHERE user_id = ?", [req.userId], (err, rows) => {
        if (err) {
            res.status(500).send({ error: 'Database error' });
        } else {
            res.send(rows.map(row => row.team_id));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
