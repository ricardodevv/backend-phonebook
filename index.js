require('dotenv').config()
const express = require('express')
const app = express()
const Phone = require('./models/contacts')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let peps = [
    {
      "name": "Arto Hellas",
      "phone": "040-445-868",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "phone": "39-89-88-787",
      "id": 2
    },
    {
      "name": "Pieck Fortune",
      "phone": "58-884-784",
      "id": 3
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Home Page</h1>')
})

app.get('/api/peps', (request, response) => {
  Phone.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/info', (request, response) => {
  const ids = peps.length > 0
    ? Math.max(...peps.map(p => p.id))
    : 0 
  
  const d = new Date()
  
  response.send(`Phonebook has info for ${ids} people </br> ${d}`)
})
 
app.get('/api/peps/:id', (request, response) => {
  Phone.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    } 
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})
  
app.delete('/api/peps/:id', (request, response) => {
  const id = request.params.id
  people = peps.filter(el => el.id !== id)

  response.status(204).end()
})

const generateId = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const randm = Math.floor(Math.random() * (max - min + 1) + min)
  return randm
}

app.post('/api/peps', (request, response) => {
  const body = request.body

  const person = new Phone({
    name: body.name,
    phone: body.phone,
  })

  const ifExist = peps.find(el => el.name === person.name)

  if (!person.name) {
    return response.status(400).json({
      error: 'No name typed'
    })
  } else if (!person.phone) {
    return response.status(400).json({
      error: 'No number typed'
    })
  } else {
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
