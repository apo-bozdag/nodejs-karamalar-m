const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.send('merhaba express');
});

app.get('/asd', (req, res) => {
    res.send('asd express');
});

app.listen(3000, () => {
    console.log("express server çalıştı.");
    console.log("http://localhost:3000");
});