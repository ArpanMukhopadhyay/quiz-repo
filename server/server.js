const express = require('express');
const app = express();
const PORT = 3000;
const CORS = require('cors');

app.use(CORS());
app.use(express.json());

let dummyJson = [];
let lastId = 0;

app.post('/dummyJson', (req, res) => {
    let issue = req.body;
    lastId++;  
    issue.id = lastId;
    dummyJson.push(issue);
    console.log('json created', issue);
    res.status(201).send(issue);
});

app.get('/dummyJson', (req, res) => {
    res.send(dummyJson);
});

app.put('/dummyJson/:id', (req, res) => {
    let data = dummyJson.find(i => i.id === parseInt(req.params.id));
    if (data) {
        data.title = req.body.title;
        data.description = req.body.description;
        console.log('new: ', data);
        res.send(data);
    } else {
        res.status(404).send({ message: 'Data missing' });
    }
});

app.delete('/dummyJson/:id', (req, res) => {
    let idx = dummyJson.findIndex(i => i.id === parseInt(req.params.id));
    if (idx !== -1) {
        console.log('deleted', dummyJson[idx]);
        dummyJson.splice(idx, 1);
        res.send({ message: 'issue deleted' });
    } else {
        res.status(404).send({ message: 'Data missing' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
