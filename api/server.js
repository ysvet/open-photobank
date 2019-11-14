const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();
app.use(cors());

//Init middleware (bodyparser)
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/photo', require('./routes/api/photo'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/contributor', require('./routes/api/contributor'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/album', require('./routes/api/album'));
app.use('/api/location', require('./routes/api/location'));
app.use('/api/period', require('./routes/api/period'));
app.use('/api/settings', require('./routes/api/settings'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
