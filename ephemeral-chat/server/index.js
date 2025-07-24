require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
const app = express()
app.use(cors())
app.use(express.json())
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
app.use(express.static(path.join(__dirname, '../public')))
app.post('/api/active-users', async (req, res) => {
  const { username } = req.body
  await supabase.from('active_users').upsert([{ username }])
  res.json({ ok: true })
})
app.post('/api/active-users/remove', async (req, res) => {
  const { username } = req.body
  await supabase.from('active_users').delete().eq('username', username)
  res.json({ ok: true })
})
app.get('/api/active-users', async (req, res) => {
  const { data } = await supabase.from('active_users').select('username')
  res.json(data)
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
