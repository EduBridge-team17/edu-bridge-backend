const express = require('express');
const supabase = require('../db/supabase');
const authenticate = require('../middleware/auth');
const router = express.Router();

// GET /api/subjects – distinct subjects from lessons
router.get('/', authenticate, async (req, res) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('subject')
    .not('subject', 'is', null);

  if (error) return res.status(500).json({ error: error.message });

  const subjects = [...new Set(data.map(item => item.subject))];
  res.json(subjects);
});

module.exports = router;