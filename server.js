const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


app.use(cors()); 
app.use(bodyParser.json()); 


const mongoDB = 'mongodb://127.0.0.1:27017/courseSelection'; 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const feedbackSchema = new mongoose.Schema({
    theoryCourses: [String], 
    labCourses: [String], 
    feedback: String, 
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


app.post('/submit', async (req, res) => {
    const { theoryCourses, labCourses, feedback } = req.body;

    const newFeedback = new Feedback({ theoryCourses, labCourses, feedback });
    try {
        await newFeedback.save(); 
        res.status(201).json({ message: 'Data saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require('dotenv').config();
const uri = process.env.MONGODB_URI;
