require('dotenv').config(); // make sure it's at the top

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test route
app.get('/', (req, res) => {
  res.send('✅ Node server is running');
});

// POST username to active_users
app.post('/api/active-users', async (req, res) => {
  const { username } = req.body;

  const { data, error } = await supabase
    .from('active_users')
    .insert([{ username }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'User added', data });
});

// DELETE username from active_users
app.delete('/api/active-users', async (req, res) => {
  const { username } = req.body;

  const { error } = await supabase
    .from('active_users')
    .delete()
    .eq('username', username);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'User removed' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
