const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
app.use(express.json());

connectDB();

app.get('/', async (req, res) => {
    try {
        res.send({ message: 'Welcome to Practical Exam!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.use('/api', router);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));