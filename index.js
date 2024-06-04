const express = require('express');
const app = express();
// const cors = require('cors');

// app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000')
})
export default app;