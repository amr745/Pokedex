const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const Pokemon = require('./models/pokemon.js');

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { 
        data: Pokemon
    });
});

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { 
        data: Pokemon[req.params.id]
    });
});

app.listen(3000, () => {
    console.log(`Listening on port: ${PORT}`)
});