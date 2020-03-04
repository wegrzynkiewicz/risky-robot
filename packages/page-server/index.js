import express from 'express';

const app = express();
app.use(express.static('../game-client/dist'));
app.use(express.static('../game-client/'));
app.use(express.static('../'));

const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, hostname, () => {
    process.stdout.write(`Example app listening on port ${port}!`);
});
