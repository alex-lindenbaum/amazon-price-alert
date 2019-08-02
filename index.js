const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const app = express();

// Middleware
app.use(cors({ origin: 'https://amazon-price-alert-web.herokuapp.com' }));
app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/items', require('./routes/items'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening at *: ${port}`));