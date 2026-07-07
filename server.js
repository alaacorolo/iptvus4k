const express = require('express');
const path = require('path');
const app = express();

// Use port defined by environment variable (Hostinger provides this) or fallback to 3000
const PORT = process.env.PORT || 3000;

// Serve static assets and files from the root folder
app.use(express.static(path.join(__dirname, '.')));

// Fallback route: server index.html for all page requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
    console.log(`IPTVUS4K server is running on port ${PORT}`);
});
