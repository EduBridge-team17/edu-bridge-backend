const express = require('express');
const supabase = require('../db/supabase');
const authenticate = require('../middleware/auth');
const router = express.Router();

// PATCH /api/schools/:id – update school name
router.patch('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Optional: verify teacher owns this school (via users table)
  const { data, error } = await supabase
    .from('schools')
    .update({ name })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;