const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = config.get('port') || 1337;

app.use(express.json({extended: true}));
app.use(cors());

app.use('/api/consumption/', require('./routes/consumption.routes'));
app.use('/api/auth/', require('./routes/auth.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    })
}

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`);
        });
    } catch (e) {
        console.log('SERVER ERROR:', e.message);
        process.exit(1);
    }
};

start().then(() => console.log('Start...'));
