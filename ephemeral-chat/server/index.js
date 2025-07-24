require('dotenv').config(); // ✅ Load environment variables

const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files from "public" directory
app.use(express.static(path.join(__dirname, '../public')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Serve index.html as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ✅ API: POST username to active_users
app.post('/api/active-users', async (req, res) => {
  const { username } = req.body;

  const { data, error } = await supabase
    .from('active_users')
    .insert([{ username }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'User added', data });
});

// ✅ API: DELETE username from active_users
app.delete('/api/active-users', async (req, res) => {
  const { username } = req.body;

  const { error } = await supabase
    .from('active_users')
    .delete()
    .eq('username', username);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'User removed' });
});

// ✅ Optional: fallback route for other URLs (if using SPA)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
