const express = require ('express');
const fs = require ('fs');
const path = require ('path');
const app = express();
const db = require ('./db/db.json');

const PORT = process.env.PORT || 5000;

const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json'), (err,data) => {
    if (err) throw err;
}));

const dbUpdate = dbData => {
    fs.writeFileSync(path.join(__dirname, "/db/db.json"),
    JSON.stringify(dbData),
    err => {
       if (err) throw err;
    })}


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/assets/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/css/style.css'));
});

app.get('assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/assets/js/index.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));

});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    return res.json(dbData);
});

app.post('api/notes', (req, res) => {
    let note = req.body;
    let id = dbData.length;
    note.id = id + 1;
    dbData.push(note);
    dbUpdate(dbData);
    return res.json(dbData);
});



app.listen (PORT, () => console.log(`Server started on port ${PORT}`));