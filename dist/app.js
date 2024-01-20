import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Load Server');
});
app.listen(port, () => {
    console.log(`App is Listening on port ${port}`);
});
