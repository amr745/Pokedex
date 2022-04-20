const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3001;
const Pokemon = require('./models/pokemon.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static("public"));

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

//CREATE
app.post('/pokemon', (req,res) => {
    const newPokemon = {
        name: req.body.name,
        type: req.body.type.split(','),
        img: req.body.img,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    };
    Pokemon.push(newPokemon);
    res.redirect('/pokemon');
});

//DESTROY
app.delete("/pokemon/:id", (req, res) => {
    const index = req.params.id
    Pokemon.splice(index, 1)
    res.redirect(`/pokemon`)
  })

//EDIT
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        poke: Pokemon[req.params.id],
        index: req.params.id
    })
})

//UPDATE
app.put("/pokemon/:id", (req, res) => {
    const updatedPokemon = {
        name: req.body.name,
        type: req.body.type.split(','),
        img: req.body.img,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    };
    Pokemon[req.params.id] = updatedPokemon;
    res.redirect(`/pokemon/${req.params.id}`)
});

app.listen(3000, () => {
    console.log(`Listening on port: ${PORT}`)
});