const express = require('express')  //va chercher depence express dans node modules
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()   // création d'une instance express
const port = process.env.PORT || 3000  // pour que l'appli demarre aussi bien en localhost que sur heroku

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello, Heroku !')
})

// ici pts de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

/*-----version abrégé de:
const findAllPokemons = require('./src/routes/findAllPokemons')
findAllPokemons(app)*/

app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})


/*----------------ANCIEN PTS DE TERMINAISON
app.get('/',(req,res) => res.send('Hello, Express 5!')) //le coeur d'express, get est la méthode de la requête ('/' veut dire route par defaut),  (req: recupert un obj en entrée, res: obj renvoyé depuis express pour les clients)

app.get('/api/pokemons', (req, res) => {
    const message = `La liste de pokémons a bien été recupérée`
    res.json(success(message, pokemons))
    //res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment`)
})

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)   // params.id est une string "1" il faut la convertir en nombre
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
    //res.json(helper.success(message, pokemon))    si importer par "const helper = require('./helper.js)"
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id, created: new Date()}} ///id peut aussi s'écrire id: id
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id',(req, res) => {  
    const id= parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
})
*/
app.listen(port, () => console.log(`Notre appli Node est démarée sur: http://localhost:${port}`))   