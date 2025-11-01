// db.js

import pkg from 'pg';
const { Pool } = pkg;

// Create a connection pool.
// It automatically uses the DATABASE_URL environment variable from Render.
const pool = new Pool();

// --- Connection Test ---
// This logs a message on deployment to confirm the database link is active.
pool.connect()
  .then(() => console.log('✅ PostgreSQL connected successfully!'))
  .catch(err => console.error('❌ Database connection error:', err.stack));

// Export the pool so other files can run queries
export default pool;
