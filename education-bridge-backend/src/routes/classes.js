// routes/classes.js
router.get('/', authenticate, async (req, res) => {
  const { teacher_id } = req.query;
  if (req.user.id !== teacher_id) return res.status(403).json({ error: 'Unauthorized' });

  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('teacher_id', teacher_id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});