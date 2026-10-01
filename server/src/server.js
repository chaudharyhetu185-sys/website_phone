const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from server/.env, root .env, or process.cwd()
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/db');
const { verifySMTPTransporter } = require('./controllers/contactController');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Attempt DB Connection (Non-blocking fallback enabled)
  await connectDB();

  // Verify SMTP Email Setup
  await verifySMTPTransporter();

  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 REST API Server running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`==================================================`);
  });
};

startServer();
