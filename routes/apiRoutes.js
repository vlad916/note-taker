const fs = require ('fs');

module.exports = function(app) {

    app.get('/api/notes', (req, res) => {
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), (err, data) => {
            if (err) throw err;
        }));
        return res.json(notes);
    });

    app.post('/api/notes', (req, res ) => {
        let newNote = req.body;
        let id = notes.length;
        newNote.id = id + 1;
        notes.push(newNote);

        fs.writeFileSync(path.join(__dirname, 'db/db.json'),
        JSON.stringify(notes),
        err => {
            if (err) throw err;
        })
        return res.json(notes);
    });

    app.delete('api/notes/:id', (req, res) => {

    });

};  