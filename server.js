const fs = require ('fs');
const express = require ('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use(express.static('db'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.listen (PORT, () => console.log(`Server started on port ${PORT}`));