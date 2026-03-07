const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const lessonRoutes = require('./src/routes/lessons');
const progressRoutes = require('./src/routes/progress');
const syncRoutes = require('./src/routes/sync');
const classesRoutes = require('./src/routes/classes');
const subjectsRoutes = require('./src/routes/subjects');
const levelsRoutes = require('./src/routes/levels');
const usersRoutes = require('./src/routes/users');
const schoolsRoutes = require('./src/routes/schools');

// Create the app instance
const app = express();
const PORT = process.env.PORT || 5000;

// Use middleware
app.use(cors());
app.use(express.json());

// Use routes 
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/levels', levelsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/schools', schoolsRoutes);

app.get('/', (req, res) => {
  res.send('Education Bridge API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});