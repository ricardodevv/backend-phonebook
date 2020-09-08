const express = require('express')
const cors = require('cors')
const app = express()

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
  response.json(peps)
})

app.get('/api/info', (request, response) => {
  const ids = peps.length > 0
    ? Math.max(...peps.map(p => p.id))
    : 0 
  
  const d = new Date()
  
  response.send(`Phonebook has info for ${ids} people </br> ${d}`)
})
 
app.get('/api/peps/:id', (request, response) => {
  const id = Number(request.params.id) 
  const person = peps.find(el => el.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  } 
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

  const person = {
    name: body.name,
    phone: body.phone,
    id: generateId(3, 3000),
  }

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
    peps = peps.concat(person)
    response.json(person)
  }
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
