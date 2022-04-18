const express = require('express');
let bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3001;
const Pokemon = require('./models/pokemon.js');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { 
        data: Pokemon
    });
});

//NEW
app.get('/pokemon/new', (req,res) => {
    res.render('new.ejs');
});

// SHOW
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { 
        data: Pokemon[req.params.id]
    });
});

//Create New
app.post('/pokemon', (req,res) => {
    const newPokemon = 
    {
        name: req.body.name,
        type: req.body.type.split(','),
        img: req.body.img,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    Pokemon.push(newPokemon);
    res.redirect('/pokemon');
});

app.listen(3000, () => {
    console.log(`Listening on port: ${PORT}`)
});