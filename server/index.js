const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const studentsRouter = require('./route/studentsRoute');

var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.disable( 'x-powered-by' );

app.use('/products', studentsRouter);

app.get('', (req, res) => {
    res.json({message: 'ok'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});