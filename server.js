const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Popup trigger state
let shouldShowPopup = false;

// API endpoint to trigger popup
app.get('/api/trigger-popup', (req, res) => {
  console.log('GET /api/trigger-popup called, shouldShowPopup:', shouldShowPopup);
  res.json({ showPopup: shouldShowPopup });
});

// API endpoint to set popup trigger (for testing)
app.post('/api/trigger-popup', (req, res) => {
  shouldShowPopup = req.body.showPopup || false;
  console.log('POST /api/trigger-popup called, setting shouldShowPopup to:', shouldShowPopup);
  res.json({ success: true, showPopup: shouldShowPopup });
});

// Simple test endpoint to trigger popup
app.get('/api/test-popup', (req, res) => {
  console.log('GET /api/test-popup called, triggering popup');
  shouldShowPopup = true;
  res.json({ success: true, message: 'Popup triggered! Check the frontend.' });
});

// Reset popup trigger after it's shown
app.post('/api/reset-popup', (req, res) => {
  console.log('POST /api/reset-popup called, resetting shouldShowPopup');
  shouldShowPopup = false;
  res.json({ success: true });
});

// Serve React app for all other routes - using a simpler approach
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`To trigger popup: curl -X POST http://localhost:${PORT}/api/trigger-popup -H "Content-Type: application/json" -d '{"showPopup": true}'`);
  console.log(`To test popup: curl http://localhost:${PORT}/api/test-popup`);
  console.log(`To check popup status: curl http://localhost:${PORT}/api/trigger-popup`);
}); 