const express = require('express');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world!')
})