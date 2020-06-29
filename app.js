const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

let notesArr = [];

app.get('/api/notes', (req, res) => {
    let readFile = fs.readFileSync('db/db.json','utf-8');
    readFile = JSON.parse(readFile);
    res.json(readFile);
});

app.post('/api/notes', (req, res) => {
    let notes = req.body;
    notesArr.push(notes);
    fs.writeFileSync('db/db.json', JSON.stringify(notesArr) + "\n");
    res.json(notesArr);
});

// app.delete('/api/notes/:id', (req, res) => {
//     // notesArr =[];
//     let readFile = fs.readFileSync('db/db.json', 'utf-8');
//     readFile = JSON.parse(readFile);

//     let deleteFile = readFile.filter( (notes) => {
//         return notes.id = req.params.id;
//     });

//     deleteFile = JSON.stringify(deleteFile);

//     fs.writeFileSync('db/db.json', deleteFile);
//     res.json(notesArr);
// });

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const noteList = JSON.parse(fs.readFileSync('./db/db.json'))
    noteList.splice(id,1)
    noteList.forEach((item, index, arr)=>{
        arr[index] = {...item, id:index}
    })
    
    fs.writeFileSync('db/db.json', JSON.stringify(noteList))
    res.send(noteList)
})

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});