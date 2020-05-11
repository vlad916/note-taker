// dependecies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const db = require("./db/db.json");

// sets an initial port 
const PORT = process.env.PORT || 5000;

const notes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
    if (err) throw err;
  })
);

const notesUpdate = (notes) => {
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
    }
  );
};

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// css routes
app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// api routes
app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

// create new notes
app.post("/api/notes", (req, res) => {
  let note = req.body;
  let id = notes.length;
  note.id = id + 1;
  notes.push(note);
  notesUpdate(notes);
  return res.json(notes);
});

// delete existing notes
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  let interval = 1;
  notes.splice(`${id - 1}`, 1);
  for (let i = 0; i < notes.length; i++) {
    notes[i].id = interval;
    interval = interval + 1;
  }
  notesUpdate(notes);
  res.send(notes);
});

// Listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
