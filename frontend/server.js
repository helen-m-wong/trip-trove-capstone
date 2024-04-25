const express = require('express');
const path = require('path'); // Import the path module

const app = express();

// Define the directory where your static files are located
const staticDir = path.join(__dirname, 'cs467- project'); // Assuming your CSS file is in a folder named 'public'

// Serve static files from the 'public' directory
app.use(express.static(staticDir));

// Define route for serving index.html
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node API is running on port ${PORT}`);
});