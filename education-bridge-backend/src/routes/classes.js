const express = require('express');
const supabase = require('../db/supabase');
const authenticate = require('../middleware/auth');
const router = express.Router();

// GET /api/classes?teacher_id=xxx
router.get('/', authenticate, async (req, res) => {
  const { teacher_id } = req.query;

  // Ensure the authenticated user matches the requested teacher_id
  if (req.user.id !== teacher_id) {
    return res.status(403).json({ error: 'You can only view your own classes' });
  }

  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('teacher_id', teacher_id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;