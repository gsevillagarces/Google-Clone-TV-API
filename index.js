console.clear()
console.log(`Iniciando API...`)

require('dotenv').config()

const express   = require('express')
const cors      = require('cors')
const mongoose  = require('mongoose')
      mongoose.set('strictQuery' , false)

const app       = express()

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded( { extended : false } ))

let db = 'mongodb+srv://gsevillagarces:test123@cluster0.ty0etsd.mongodb.net/test' || 'mongodb://127.0.0.1:27017/google-clone-tv'

// let db = 'mongodb://127.0.0.1:27017/google-clone-tv'

const main = async () => await mongoose.connect(db)
    .then (() => {
    console.log(`Conectando a mongoDB...`)
}) 

main()

//apps
const appsSchema = new mongoose.Schema(
    { appName: String, logoApp: String, appColor: String, href: String},
    { collection : 'apps' }
)

const Apps = mongoose.model('Apps', appsSchema)

app.get( '/apps', async (req, res) => {
    const buscar = await Apps.find()
    res.json(buscar)
})

//showApps
app.get( '/apps/:appId', async (req, res) => {
    const { appId } = req.params
    const buscar = await Apps.find({_id : appId})
    res.json(buscar)
})


//avatar
const avatarSchema = new mongoose.Schema(
    { img: String, alt: String, title: String, href: String },
    { collection : 'avatar' }
)

const Avatar = mongoose.model('Avatar', avatarSchema)

app.get( '/avatar', async (req, res) => {
    const buscar = await Avatar.find()
    res.json(buscar)
})

//content
const contentSchema = new mongoose.Schema(
    { type: String, provider: String, alt: String, logoProvider: String, bgSlide: String, bgSmall: String, title: String, summary: String, btnText: String, rating: String, restriction: String, category: String, years: String, watchlisted: String, watched: String, featured: String },
    { collection : 'content' }
)

const Content = mongoose.model('Content', contentSchema)

app.get( '/content', async (req, res) => {
    const buscar = await Content.find()
    res.json(buscar)
})

//showContent
app.get( '/content/:movie', async (req, res) => {
    const { movie } = req.params
    const buscar = await Content.find({_id : movie})
    res.json(buscar)
})

//h1
const h1Schema = new mongoose.Schema(
    { h1: String, src: String, alt: String },
    { collection : 'h1' }
)

const H1 = mongoose.model('H1', h1Schema)

app.get( '/h1', async (req, res) => {
    const buscar = await H1.find()
    res.json(buscar)
})

//menu
const menuSchema = new mongoose.Schema(
    { menu: String, href: String },
    { collection : 'menu' }
)

const Menu = mongoose.model('Menu', menuSchema)

app.get( '/menu', async (req, res) => {
    const buscar = await Menu.find()
    res.json(buscar)
})

//suggestions
const suggestionsSchema = new mongoose.Schema(
    { txt: String, image: String, alt : String,  href: String },
    { collection : 'suggestions' }
)

const Suggestions = mongoose.model('Suggestions', suggestionsSchema)

app.get( '/suggestions', async (req, res) => {
    const buscar = await Suggestions.find()
    res.json(buscar)
})

//users
const usersSchema = new mongoose.Schema(
    { name:String, username: String, password: String },
    { collection : 'users' }
)

const Users = mongoose.model('Users', usersSchema)

app.get( '/users', async (req, res) => {
    const buscar = await Users.find()
    res.json(buscar)
})

app.post( '/users', async (req, res) => {
    const { name, username, password } = req.body
    const newUser = new Users({ name, username, password })

    newUser.save()

    const buscar = await Users.find()
    res.json(buscar)
})

app.put( '/users', async (req, res) => {
    const { body } = req
    const { _id, ...resto } = body
    
    await Users.findByIdAndUpdate (_id, resto)

    const buscar = await Users.find()
    res.json(buscar)
})

//editUsers
app.get( '/users/:user', async (req, res) => {
    const { user } = req.params
    const buscar = await Users.find({_id : user})
    res.json(buscar)
})

//deleteUsers
app.delete( '/users/:user', async (req, res) => {
    const { user } = req.params
    await Users.findByIdAndDelete(user)
    const buscar = await Users.find()
    res.json(buscar)
})

//login
const loginSchema = new mongoose.Schema(
    { username: String, password: String },
    { collection : 'users' }
)

const Login = mongoose.model('Login', loginSchema)

app.get( '/login', async (req, res) => {
    const buscar = await Login.find()
    res.json(buscar)
})

app.post( '/login', async (req, res) => {
    
    const { username, password } = req.body
    const buscar = await Login.find()

    const buscarUsuario = buscar.find( user => user.username === username )

    buscarUsuario === undefined && res.json({ error: 'User not found' , entrar : false })
    buscarUsuario && buscarUsuario.password === password && res.json({ entrar : true })
    buscarUsuario && buscarUsuario.password !== password && res.json({ error: 'Incorrect password' , entrar : false })}    
)

app.listen( 4002 , () => {
    console.log(`Iniciando la API en el puerto 4002`)
})

module.exports = app