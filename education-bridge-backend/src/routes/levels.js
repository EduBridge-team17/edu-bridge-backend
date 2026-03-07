const express = require('express');
const supabase = require('../db/supabase');
const authenticate = require('../middleware/auth');
const router = express.Router();

// GET /api/levels – return all levels ordered by display_order
router.get('/', authenticate, async (req, res) => {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;