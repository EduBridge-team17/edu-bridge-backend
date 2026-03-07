const express = require('express');
const supabase = require('../db/supabase');
const authenticate = require('../middleware/auth');
const router = express.Router();

// PATCH /api/users/me – update current user's phone
router.patch('/me', authenticate, async (req, res) => {
  const { phone } = req.body;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('users')
    .update({ phone, updated_at: new Date() })
    .eq('id', userId)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// GET /api/users/me/school – get teacher's school details
router.get('/me/school', authenticate, async (req, res) => {
  const userId = req.user.id;

  // Get user's school_id
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('school_id')
    .eq('id', userId)
    .single();

  if (userError) return res.status(500).json({ error: userError.message });
  if (!user.school_id) return res.json(null); // no school yet

  const { data: school, error: schoolError } = await supabase
    .from('schools')
    .select('*')
    .eq('id', user.school_id)
    .single();

  if (schoolError) return res.status(500).json({ error: schoolError.message });
  res.json(school);
});

module.exports = router;