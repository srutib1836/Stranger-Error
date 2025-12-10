const express = require('express');
const router = express.Router();
const config = require('../config/gameConfig');

// Auth Route
router.post('/auth', (req, res) => {
    const userCode = req.body.accessCode;
    const role = config.ROLE_CODES[userCode];

    if (role) {
        res.json({ success: true, role: role });
    } else {
        res.json({ success: false, message: "ACCESS DENIED" });
    }
});

// Check Code Route
router.post('/check-code', (req, res) => {
    const userCode = req.body.code;
    if (userCode === config.SECRET_CODE) {
        res.json({ success: true, message: "Code Accepted" });
    } else {
        res.json({ success: false, message: "Invalid Code" });
    }
});

module.exports = router;