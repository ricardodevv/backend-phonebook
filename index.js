const express = require('express')
const app = express()
require('dotenv').config()
const Phone = require('./models/contacts')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/peps', (request, response) => {
  Phone.find({}).then(contacts => {
    response.json(contacts.map(contact => contact.toJSON()))
  })
})

app.get('/api/peps/:id', (request, response, next) => {
  Phone.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact.toJSON())
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/peps/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/peps', (request, response, next) => {
  const body = request.body

  const person = new Phone({
    name: body.name,
    phone: body.phone,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
    .catch(error => next(error))
})

app.put('/api/peps/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const person = {
    name: body.name,
    phone: body.phone,
  }

  Phone.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
